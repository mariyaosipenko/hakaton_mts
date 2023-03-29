package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Film struct {
	Id   int64  `json:"id"`
	File string `json:"file"`
}

type getFilmsResponse struct {
	Films []Film `json:"films"`
}

func main() {
	// Set the flags for the logging package to give us the filename in the logs
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	dbPool := getDBConnection(context.Background())
	defer dbPool.Close()

	log.Println("starting server...")

	r := mux.NewRouter()
	r.HandleFunc("/films", filmsHandler(dbPool))
	r.HandleFunc("/file/{file}", fileHandler())
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

func filmsHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(context.Background(), "SELECT * FROM films;")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			log.Printf("error: %v\n", err.Error())
			return
		}
		defer rows.Close()

		var films []Film

		for rows.Next() {
			var film Film
			if err := rows.Scan(&film.Id, &film.File); err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				log.Printf("error: %v\n", err.Error())
				return
			}
			films = append(films, film)
		}
		if err = rows.Err(); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			log.Printf("error: %v\n", err.Error())
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		var response getFilmsResponse
		response.Films = make([]Film, len(films))
		for i := range films {
			response.Films[i] = films[i]
		}
		body, err := json.Marshal(response)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			log.Printf("error: %v\n", err.Error())
			return
		}

		if _, err = w.Write(body); err != nil {
			log.Printf("failed to write response body")
		}
	}
}

func fileHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		path := "/films/" + vars["file"]
		if _, err := os.Stat(path); err != nil {
			if os.IsNotExist(err) {
				log.Println("error: " + err.Error() + "\nunable to load file at: " + path + "\n")
			}
			log.Println("error with file path: " + "\nerror message: " + err.Error() + "\n")
		}
		file, err := os.Open(path)
		if err != nil {
			log.Printf("Error with path %s: %v", path, err)
			w.WriteHeader(404)
			w.Write([]byte("404"))
		}
		defer file.Close()
		l, err := file.Stat()
		if err != nil {
			log.Println("error with file stat: " + "\nerror message: " + err.Error() + "\n")
		}
		var buffer = make([]byte, int(l.Size()))

		_, err = file.Read(buffer)
		if err != nil {
			log.Println("error with writing file: " + "\nerror message: " + err.Error() + "\n")
		}
		fmt.Println(buffer)

		file.Seek(0, 0)
		contentType := http.DetectContentType(buffer)
		w.Header().Set("Content-type", contentType)
		w.Write(buffer)

	}
}

func getDBConnection(ctx context.Context) *pgxpool.Pool {
	// Retrieve the database host address
	host := os.Getenv("DD_DB_HOST")
	if host == "" {
		host = "127.0.0.1"
	}

	const connectionString = "postgres://goland:goland@%s:5432/hm?sslmode=disable"

	// Try connecting to the database a few times before giving up
	// Retry to connect for a while
	var dbPool *pgxpool.Pool
	var err error
	for i := 1; i < 8; i++ {
		log.Printf("trying to connect to the db server (attempt %d)...\n", i)
		dbPool, err = pgxpool.New(ctx, fmt.Sprintf(connectionString, host))
		if err == nil {
			break
		}
		log.Printf("got error: %v\n", err)

		// Sleep a bit before trying again
		time.Sleep(time.Duration(i*i) * time.Second)
	}

	// Stop execution if the database was not initialized
	if dbPool == nil {
		log.Fatalln("could not connect to the database")
	}

	// Get a connection from the pool and check if the database connection is active and working
	db, err := dbPool.Acquire(ctx)
	if err != nil {
		log.Fatalf("failed to get connection on startup: %v\n", err)
	}
	if err := db.Conn().Ping(ctx); err != nil {
		log.Fatalln(err)
	}

	// Add the connection back to the pool
	db.Release()

	return dbPool
}
