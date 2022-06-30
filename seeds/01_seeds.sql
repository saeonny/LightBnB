INSERT INTO users (name,email,password)
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u' ),
 ('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
 ('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u') ;

INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES (1, 'sae', 'desc', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350',  'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',350.4, 6 , 4 ,   8 , 'Canada' , '536 Namsub Highway' , 'Sotboske',  'Quebec'  , '28142' , true),
(1, 'saeby', 'desc', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350',  'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',333, 3 , 1 ,   5 , 'Canada' , '536 Namsub Highway' , 'Sotboske',  'Ontario'  , '28142' , false),
(2, 'coolplace', 'desc', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350',  'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',432, 5 , 6 ,   8 , 'Canada' , '151townsgate' , 'Sotboske',  'Ontario'  , '45321' , true);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ( '2018-09-11'  , '2018-09-26' ,  2 ,  3),
( '2018-10-12'  , '2018-10-14' ,  1 ,  2),
( '2018-11-11'  , '2018-11-14' ,  2 ,  1);

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating,message)
VALUES (3,2,1,3,'nahh'),
(2,1,2,5,'hmm good'),
(1,2,3,3.5, 'not bad');