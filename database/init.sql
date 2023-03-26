create table films
(
    id   serial primary key,
    file varchar(300)
);

create table film_info
(
    id      serial primary key,
    film_id int,
    type    int,
    value   varchar(50),
    time    timestamp
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
    file    varchar(300)
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
