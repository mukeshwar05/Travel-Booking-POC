# Booking Data Ingestion System (Proof of Concept)

## Overview
This project is a backend service for ingesting, processing, and storing booking data. It uses **Node.js** as the backend framework and **SQLite** for database management. The system provides RESTful APIs for booking data management and integrates **Swagger** for API documentation.

---

## Technology Stack
- **Backend**: Node.js with Express framework.
- **Database**: SQLite (uses `database.db` file as storage).
- **API Documentation**: Swagger.

---
## Sequential Diagram
![image](https://github.com/user-attachments/assets/b538f232-3c98-411f-807e-a0792e4ce07d)

## Setup and Usage

### 1. Clone the Repository
```bash
git clone <repository-link>
cd <repository-directory>
```
### 2. Install Dependencies
Ensure you have Node.js installed. Then, run the following command to install all required dependencies:
```bash
npm install
```
### 3. Database Setup
This project uses SQLite with a `database.db` file. Follow these steps to manage and query the database:

1. **Install SQLite3 CLI Tool**
   
2. **Open the Database**  
   Run the following command from src/ folder to open the SQLite database file:
   ```bash
   sqlite3 database.db
   ```
   To check schema : 
   ```bash
   sqlite> .schema
   ```
   To run queries : 
   ```bash
   sqlite> SELECT * FROM bookings;
   ```

### 4. Start the server using the following command:
```bash
npm start
```


## API Documentation

The API has four endpoints for managing booking data:

#### Available Endpoints
| Endpoint       | Method        | Description                                                           |
| -------------  |:-------------:| ---------------------------------------------------------------------:|
| /bookings      | POST          | Add a new booking with validation check.                              |
| /bookings      | GET           |   Retrieve a list of bookings with optional filters(date and vendor). |
| /bookings/{id} | GET           |    Retrieve details of a booking by its ID.                           |
| /bookings/{id} | DELETE        |    Delete a booking by its ID.                                        |


### Swagger Documentation

Open Swagger by navigating to http://localhost:3000/api-docs in your browser.

View detailed API specifications.

### Postman

You can find the Postman collection [here](https://elements.getpostman.com/redirect?entityId=17411135-460d888b-2459-4394-9dec-bac645b8b6fe&entityType=collection).

## Improvement Suggestions
1. **Handling Multiple Data Sources**: Implement adapters for different data formats (e.g., XML, CSV) using a interface.

2. **Scaling for Higher Volumes of Data**: Introduce a queue system to handle high-throughput data ingestion.

3. **Error Handling and Retry Mechanisms**: Add retry logic for transient errors in API calls or database transactions.

4. **Data Security and Compliance**: Use authentication and authorization mechanisms (e.g., OAuth, JWT token).

## Future Enhancements
 1. **Load Balancing**: Deploy the service using a load balancer to handle increased traffic.

 2. **Containerization**: Use Docker to containerize the application for consistent deployments.

 3. **Monitoring and Logging**: Add monitoring tools and centralized logging.

 4. **Cloud Integration**: Host the service on Cloud and use their managed databases for scalability.

 5. **CI/CD Pipeline**: Automate testing, building, and deployment processes.












