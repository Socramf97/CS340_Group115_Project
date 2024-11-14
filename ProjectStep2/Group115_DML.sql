SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


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
