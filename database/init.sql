create table status
(
    id serial primary key,
    name varchar(30)
);

create table films
(
    id   serial primary key,
    file varchar(300),
    status int,
    foreign key (status) references status(id)
);

create table film_info
(
    id         serial primary key,
    film_id    int,
    type       int,
    value      varchar(50),
    start_time timestamp,
    end_time   timestamp,
    foreign key (film_id) references films(id)
);

create table info_type
(
    id   serial primary key,
    name varchar(30)
);

create table film_alt
(
    id      serial primary key,
    film_id int,
    type    int,
    file    varchar(300),
    foreign key (film_id) references films(id)
);

create table alt_type
(
    id   serial primary key,
    name varchar(30)
);

insert into films (file)
values ('4th-of-july-fireworks-4k.mp4'),
       ('0082_ballsfallingfromsky.mov'),
       ('mixkit-colored-lights-of-cars-in-a-video-out-of-focus-44696-medium.mp4');

insert into status (name)
values ('new'),
       ('hold'),
       ('recorded'),
       ('processed');
