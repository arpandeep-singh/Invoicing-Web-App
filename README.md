# Docs

## Routes


### Get all customers
- Route: ```/api/customers```
- Method: GET

### Get customer by ID
- Route: ```/api/customers/:id```
- Method: GET

### Create new customer
- Route: ```/api/customers/add```
- Method: POST
- Body: 
```js
{
    firstName,
    lastName?,
    email
}
```
