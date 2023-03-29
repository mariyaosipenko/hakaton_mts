package main

import (
	"fmt"
	ffmpeg "github.com/u2takey/ffmpeg-go"
	"io/fs"
	"io/ioutil"
	"log"
	"os/exec"
	"strings"
)

var direct = "/Work/hakaton_mts/converter/" //ioutil.ReadDir("/films/")

func main() {
	fmt.Println("ща законвертим")
	readFileInfo("mp4")

}

func readFileInfo(prefix string) {
	if prefix == "" {
		fmt.Println("some troubles")
	}
	files, err := ioutil.ReadDir(direct)

	if err != nil {
		log.Fatal(err)
	}

	//оставляю для отладки
	//for _, file := range files {
	//	fmt.Println(file.Name(), file.IsDir())
	//}
	for _, file := range files {
		if strings.Contains(file.Name(), prefix) {
			fmt.Println(file.Name(), file.IsDir())
			//convert2gif(file.Name())
			prepare(file, 1)
		}
	}
}

func convert2gif(fileName string) {
	cmd := "ffmpeg -i \"converter\"clone.mp4 -vf \"fps=5,scale=320:-1:flags=lanczos\" -c:v pam -f image2pipe - | convert -delay 5 - -loop 0 -layers optimize test.gif"
	_, err := exec.Command("bash", "-c", cmd).Output()
	if err != nil {
		fmt.Println(fmt.Sprintf("Failed to execute command: %s", cmd))
	}
}

func prepare(file fs.FileInfo, typename int) {
	if typename <= 0 {
		fmt.Println("incorrect parameters")
	}
	err := ffmpeg.Input(file.Name(), ffmpeg.KwArgs{"ss": 1}).
		Output("out"+file.Name(), ffmpeg.KwArgs{"t": 1}).OverWriteOutput().Run()
	if err != nil {
		fmt.Println(err)
	}
	//assert.Nil(t, err)

}

//# def test_ffmpeg_interface(self):
//#     input = Input('/old')
//#     output = Output('/new')
//#
//#     ffmpeg = FFmpeg('ffmpeg', input, output)
//#     self.assertEqual(list(ffmpeg), ['ffmpeg', '-i', '/old', '/new'])

// def duration(self, file):
//#     p = self.Popen(FFmpeg.cmds_probe+" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 " + file)
//#     output, _ = p.communicate()
//#     return output.decode('ascii')[:-4]

//ffprobe -show_format -show_streams test.mp4
