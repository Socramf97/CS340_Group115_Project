SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Customers(
    customerID INT NOT NULL UNIQUE AUTO_INCREMENT,
    customerName VARCHAR(64) NOT NULL,
    customerType VARCHAR(16) NOT NULL,
    customerRace VARCHAR(16) NOT NULL,
    employeeID INT,
    PRIMARY KEY (CustomerID),
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID) ON DELETE SET NULL
);

CREATE OR REPLACE TABLE Employees(
    employeeID INT NOT NULL UNIQUE AUTO_INCREMENT,
    employeeName VARCHAR(64) NOT NULL,
    employeeRace VARCHAR(16) NOT NULL,
    PRIMARY KEY (employeeID)
);

CREATE OR REPLACE TABLE Products(
    productID INT NOT NULL UNIQUE AUTO_INCREMENT,
    price DECIMAL(19,2) NOT NULL,
    itemType VARCHAR(64) NOT NULL,
    itemRarity VARCHAR(16) NOT NULL,
    quantityStocked INT NOT NULL,
    PRIMARY KEY (productID)
);

CREATE OR REPLACE TABLE SalesOrders(
    transactionID INT NOT NULL UNIQUE AUTO_INCREMENT,
    customerID INT NOT NULL,
    employeeID INT NOT NULL,
    orderDate DATE NOT NULL,
    totalPrice DECIMAL(19,2) NOT NULL,
    PRIMARY KEY (transactionID),
    CONSTRAINT FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (employeeID) REFERENCES Employees(employeeID) ON DELETE SET NULL
);

-- Transitional table for M:M relationship between SalesOrders and Products
CREATE OR REPLACE TABLE OrderProducts(
    orderProductID INT NOT NULL UNIQUE AUTO_INCREMENT,
    transactionID INT NOT NULL,
    productID INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (orderProductID),
    FOREIGN KEY (transactionID) REFERENCES SalesOrders(transactionID) ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES Products(productID) ON DELETE CASCADE
);

INSERT INTO Customers(
    customerName,
    customerType,
    customerRace,
)
VALUES
    ('Joseph Carlson', 'Adventurer', 'Human'),
    ('Emma Rose', 'Merchant', 'Elf'),
    ('Grumly Rockstone', 'Miner', 'Dwarf'),
    ('Grog Skullcrusher', 'Mercenary', 'Orc')
;


INSERT INTO Employees(
    employeeName,
    employeeRace,
)
VALUES
    ('Bob', 'Human'),
    ('Carlenia', 'Elf'),
    ('Bort Rockstone', 'Dwarf')
;


INSERT INTO Products(
    price,
    itemType,
    itemRarity,
    quantityStocked,
)
Values
    (50.00, 'Hammer', 'Common', 5),
    (25.00, 'Rations', 'Common', 15),
    (500.00, 'Sword +1', 'Rare', 1)
;

INSERT INTO SalesOrders(
    transactionID,
    customerID,
    employeeID,
    orderDate,
    totalPrice,
)
VALUES
    (1, 2, 1, '2024-11-01', 60.00),
    (2, 1, 2, '2024-11-02', 100.00);


INSERT INTO OrderProducts(
    orderID
    transactionID,
    productID,
    quantity
)
VALUES
    (1, 1, 1, 2), -- 2 Swords in order 1
    (1, 1, 3, 5), -- 5 Potions in order 1
    (2, 2, 2, 1); -- 1 Shield in order 2


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
