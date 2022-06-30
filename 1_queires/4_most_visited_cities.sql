select pro.city, count(res) as total_reservations
FROM properties as pro 
JOIN reservations as res on pro.id = res.property_id
GROUP BY pro.city
ORDER BY total_reservations DESC;