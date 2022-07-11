const properties = require('./json/properties.json');
const users = require('./json/users.json');


const { Pool } = require('pg');
const { query } = require('express');


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

//duplicated email exists 
const getUserWithEmail = function (email) {
  const query = `
  SELECT *
  FROM users
  WHERE users.email = $1
  `
  return pool.query(query, [email])
    .then((result) => {
      if (result.rows.length === 0) {
        return null
      }
      else {
        return result.rows[0]
      }

    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const query = `
  SELECT *
  FROM users
  WHERE users.id = $1
  `
  return pool.query(query, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return null
      }
      else {
        return result.rows[0]
      }

    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const values = [user.name, user.email, user.password]
  const query = `
  INSERT INTO users (name,email,password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `
  return pool.query(query, values)
    .then((result) => { return result.rows })
    .catch((err) => {
      console.log(err.message);
    });

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const query = `
  SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT 10;
  `

  return pool.query(query, [guest_id])
    .then((result) => {
      return result.rows
    })
}

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties 
  JOIN property_reviews  ON properties.id = property_reviews.property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if(options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if(options.city){
      queryString += `AND properties.owner_id = $${queryParams.length} `;
    }
    else {queryString += `WHERE properties.owner_id = $${queryParams.length}`}
  }

  if(options.minimum_price_per_night && options.maximum_price_per_night){
    if(options.city || options.owner_id) {
      queryParams.push(`${options.minimum_price_per_night}`*100)
      queryString += `AND properties.cost_per_night >= $${queryParams.length}`
      queryParams.push(`${options.maximum_price_per_night}`*100)
      queryString += ` AND properties.cost_per_night <= $${queryParams.length}`
    }

    else {
      queryParams.push(`${options.minimum_price_per_night}`*100)
      queryString += `WHERE properties.cost_per_night >= $${queryParams.length}`
      queryParams.push(`${options.maximum_price_per_night}`*100)
      queryString += ` AND properties.cost_per_night <= $${queryParams.length}`
    }
  }


  // 4
  queryString += `
  GROUP BY properties.id`
  if (options.minimum_rating){
    const rating = Number(options.minimum_rating)
    queryParams.push(`${rating}`)
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length}`
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => {
    
    return res.rows});
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
