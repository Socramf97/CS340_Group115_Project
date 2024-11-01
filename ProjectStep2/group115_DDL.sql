SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Customers(
    customerID INT NOT NULL UNIQUE AUTO_INCREMENT,
    customerName VARCHAR(64) NOT NULL,
    customerType VARCHAR(16) NOT NULL,
    customerRace VARCHAR(16) NOT NULL,
    employeeID INT,
    PRIMARY KEY (CustomerID),
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID)
);

CREATE OR REPLACE TABLE Employees(
    employeeID INT NOT NULL UNIQUE AUTO_INCREMENT,
    employeeName VARCHAR(64) NOT NULL,
    employeeRace VARCHAR(16) NOT NULL,
    employeeID INT,
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
    productID INT NOT NULL,
    totalPrice DECIMAL(19,2) NOT NULL,
    PRIMARY KEY (transactionID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID),
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID),
    FOREIGN KEY (productID) REFERENCES Products(productID)
);

INSERT INTO Customers(

)

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
