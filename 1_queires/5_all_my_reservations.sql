SELECT res.id, pro.title, pro.cost_per_night, res.start_date, avg(rev.rating)
FROM properties as pro
JOIN reservations as res ON pro.id = res.property_id
JOIN property_reviews as rev ON pro.id = rev.property_id
WHERE res.guest_id = 3
GROUP BY pro.id, res.id 
ORDER BY start_date
LIMIT 10;