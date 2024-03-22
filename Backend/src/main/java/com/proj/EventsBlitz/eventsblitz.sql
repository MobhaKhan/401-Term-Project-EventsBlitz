-- Database creation
DROP DATABASE IF EXISTS eventsblitz;
CREATE DATABASE eventsblitz;

-- Use the created database
USE eventsblitz;

-- Create User Table with UserType column
DROP TABLE IF EXISTS User;
CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL,
    UserAddress VARCHAR(100),
    Email VARCHAR(100) NOT NULL,
    UserType VARCHAR(20) NOT NULL -- "Guest", "Registered", "Admin"
    -- Add other user-related fields as needed
);

-- Inserting User data
INSERT INTO User (UserName, UserAddress, Email, UserType) VALUES
('John Doe', '123 Main St', 'john.doe@example.com', 'Guest'),
('Mobha Khan', '502 Main St', 'khan.mobha@gmail.com', 'Admin'),
('Fabiha Tuheen', '668 Main St', 'fabiha.neera@gmail.com', 'Admin'),
('Faria Mobeen', '5656 Main St', 'faria.mobeen@gmail.com', 'Admin'),
('Alice Smith', '456 Oak St', 'alice.smith@example.com', 'Registered'),
('Bob Johnson', '789 Elm St', 'bob.johnson@example.com', 'Guest');

-- Create Admin Table with Password
DROP TABLE IF EXISTS AdminTable;
CREATE TABLE AdminTable (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT UNIQUE,
    Pwd_Admin VARCHAR(50) NOT NULL,
    -- Add other admin-related fields as needed
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- Insert data into Admin table based on User table
INSERT INTO AdminTable (UserID, Pwd_Admin)
SELECT
    u.UserID,
    'defaultPassword'  -- Set a default password or generate one based on your requirements
FROM
    User u
WHERE
    u.UserType = 'Admin';

-- Create GuestUser Table
DROP TABLE IF EXISTS GuestUser;
CREATE TABLE GuestUser (
    GuestUserID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT UNIQUE,
    -- Add other guest user-related fields as needed
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- Insert data into GuestUser table based on User table
INSERT INTO GuestUser (UserID)
SELECT
    u.UserID
FROM
    User u
WHERE
    u.UserType = 'Guest';

-- Create RegisteredUser Table with Password
DROP TABLE IF EXISTS RegisteredUser;
CREATE TABLE RegisteredUser (
    RegisteredUserID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT UNIQUE,
    Pwd_RegisteredUser VARCHAR(50) NOT NULL, -- You may adjust the size based on your security requirements
    CreditCardNumber VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- Insert data into RegisteredUser table based on User table
INSERT INTO RegisteredUser (UserID, Pwd_RegisteredUser, CreditCardNumber)
SELECT
    u.UserID,
    'defaultPassword',  -- Set a default password or generate one based on your requirements
    'defaultCreditCard' -- Set a default credit card or leave it NULL
FROM
    User u
WHERE
    u.UserType = 'Registered';

-- Table for storing event information
CREATE TABLE Event (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    event_location VARCHAR(255) NOT NULL,
    ticket_price DECIMAL(10, 2) NOT NULL,
    total_tickets INT NOT NULL,
    available_tickets INT NOT NULL,
    image_url VARCHAR(500)
);

-- Inserting Event data
INSERT INTO Event (event_name, event_description, event_date, event_time, event_location, ticket_price, total_tickets, available_tickets, image_url) VALUES
('Tech Summit', 'Annual tech conference showcasing the latest advancements in technology and innovation. Join us for insightful talks, networking opportunities, and more.', '2024-05-15', '09:00:00', 'Convention Center', 100.00, 500, 500, 'https://news.microsoft.com/wp-content/uploads/prod/sites/427/2017/02/1DX20184.jpg'),
('Music Festival', 'Experience three days of non-stop music and entertainment at our annual music festival. Featuring top artists from around the world, food vendors, and fun activities for all ages.', '2024-07-20', '17:00:00', 'Outdoor Arena', 75.00, 1000, 1000, 'https://a.cdn-hotels.com/gdcs/production109/d1730/0e79ce94-530b-408e-af0f-6550f61d621c.jpg'),
('Art Exhibition', 'Discover the beauty of modern art at our art exhibition. Explore a diverse collection of contemporary artworks, meet the artists, and immerse yourself in creativity.', '2024-06-10', '10:00:00', 'Art Gallery', 50.00, 200, 200, 'https://freshmindmag.com/wp-content/uploads/2023/04/pexels-darya-sannikova-1671014.jpg'),
(' Royal Iftar: A Luxurious Celebration', 'Join us for an exquisite Iftar experience filled with lavish dishes and traditional charm. Indulge in a regal feast fit for royalty. Book your spot now for an unforgettable evening of elegance and camaraderie.', '2024-04-08', '18:00:00', 'Rio Banquet Hall', 25.00, 30, 30, 'https://eglobaltravelmedia.com.au/wp-content/uploads/2024/03/QE2-Iftar-Al-Malika-4.jpg');

-- Create Seat Table
DROP TABLE IF EXISTS Seat;
CREATE TABLE Seat (
    SeatNumber VARCHAR(3) NOT NULL,
    EventID INT NOT NULL,
    SeatType VARCHAR(20) NOT NULL, -- Regular, Business-Class, Comfort, etc.
    Price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (SeatNumber),
    FOREIGN KEY (EventID) REFERENCES Event(EventID) ON DELETE CASCADE
);

-- Inserting Seat data
INSERT INTO Seat (SeatNumber, EventID, SeatType, Price) VALUES
-- Seats for Event 1
('A1', 1, 'Regular', 50.00),
('A2', 1, 'Regular', 50.00),
('A3', 1, 'Regular', 50.00),
('A4', 1, 'Regular', 50.00),
('A5', 1, 'Regular', 50.00),
('A6', 1, 'Regular', 50.00),
('B1', 1, 'Comfort', 75.00),
('B2', 1, 'Comfort', 75.00),
('B3', 1, 'Comfort', 75.00),
('B4', 1, 'Comfort', 75.00),
('B5', 1, 'Comfort', 75.00),
('B6', 1, 'Comfort', 75.00),
('C1', 1, 'Business-Class', 100.00),
('C2', 1, 'Business-Class', 100.00),
('C3', 1, 'Business-Class', 100.00),
('C4', 1, 'Business-Class', 100.00),
('C5', 1, 'Business-Class', 100.00),
('C6', 1, 'Business-Class', 100.00),
-- Seats for Event 2
('D1', 2, 'Regular', 50.00),
('D2', 2, 'Regular', 50.00),
('D3', 2, 'Regular', 50.00),
('D4', 2, 'Regular', 50.00),
('D5', 2, 'Regular', 50.00),
('D6', 2, 'Regular', 50.00),
('E1', 2, 'Comfort', 75.00),
('E2', 2, 'Comfort', 75.00),
('E3', 2, 'Comfort', 75.00),
('E4', 2, 'Comfort', 75.00),
('E5', 2, 'Comfort', 75.00),
('E6', 2, 'Comfort', 75.00),
('F1', 2, 'Business-Class', 100.00),
('F2', 2, 'Business-Class', 100.00),
('F3', 2, 'Business-Class', 100.00),
('F4', 2, 'Business-Class', 100.00),
('F5', 2, 'Business-Class', 100.00),
('F6', 2, 'Business-Class', 100.00),
-- Seats for Event 3
('G1', 3, 'Regular', 50.00),
('G2', 3, 'Regular', 50.00),
('G3', 3, 'Regular', 50.00),
('G4', 3, 'Regular', 50.00),
('G5', 3, 'Regular', 50.00),
('G6', 3, 'Regular', 50.00),
('H1', 3, 'Comfort', 75.00),
('H2', 3, 'Comfort', 75.00),
('H3', 3, 'Comfort', 75.00),
('H4', 3, 'Comfort', 75.00),
('H5', 3, 'Comfort', 75.00),
('H6', 3, 'Comfort', 75.00),
('I1', 3, 'Business-Class', 100.00),
('I2', 3, 'Business-Class', 100.00),
('I3', 3, 'Business-Class', 100.00),
('I4', 3, 'Business-Class', 100.00),
('I5', 3, 'Business-Class', 100.00),
('I6', 3, 'Business-Class', 100.00);

-- Create Booking Table
DROP TABLE IF EXISTS Booking;
CREATE TABLE Booking (
    BookingID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    EventID INT,
    SeatNumber VARCHAR(3),
    InsuranceSelected BOOLEAN,
    PaymentAmount DECIMAL(10, 2) NOT NULL,
    IsCancelled BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID) ON DELETE CASCADE,
    FOREIGN KEY (SeatNumber) REFERENCES Seat(SeatNumber) ON DELETE CASCADE
);

-- Inserting Booking data
INSERT INTO Booking (UserID, EventID, SeatNumber, InsuranceSelected, PaymentAmount, IsCancelled) VALUES
(1, 1, 'A1', TRUE, 150.00, FALSE),
(2, 1, 'C3', FALSE, 200.00, TRUE),
(3, 2, 'E5', TRUE, 150.00, FALSE),
(4, 3, 'H6', FALSE, 125.00, FALSE);

-- Table for storing ticket information
CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    EventID INT NOT NULL,
    UserID INT NOT NULL,
    ticket_quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (EventID) REFERENCES Event(EventID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Inserting tickets data
INSERT INTO tickets (EventID, UserID, ticket_quantity, total_price) VALUES
(1, 1, 1, 150.00),
(2, 3, 2, 150.00),
(3, 4, 1, 125.00);
