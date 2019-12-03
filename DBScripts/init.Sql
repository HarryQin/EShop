CREATE TABLE [dbo].[Customer] (
    [Id]       INT           NOT NULL IDENTITY,
    [Name]     VARCHAR (255) NOT NULL,
    [Email]    VARCHAR (255) NOT NULL,
    [Password] VARCHAR (100) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

GO

CREATE NONCLUSTERED INDEX [IX_Customer_Email]
    ON [dbo].[Customer]([Email] ASC);

GO

CREATE TABLE [dbo].[Product] (
    [Id]   INT           NOT NULL IDENTITY,
    [Name] VARCHAR (255) NOT NULL,
    [Price] DECIMAL(18, 2) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
CREATE TABLE [dbo].[Purchase] (
    [Id]        INT NOT NULL IDENTITY,
    [UserId]    INT NOT NULL,
    [ProductId] INT NOT NULL,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Purchase_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Customer] ([Id]),
    CONSTRAINT [FK_Purchase_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id])
);
GO


SET IDENTITY_INSERT [dbo].[Customer] ON
INSERT INTO [dbo].[Customer] ([Id], [Name], [Email], [Password]) VALUES (1, N'Test1', N'Test1@test.com', N'Test1')
INSERT INTO [dbo].[Customer] ([Id], [Name], [Email], [Password]) VALUES (3, N'Test2', N'Test2@test.com', N'Test2')
INSERT INTO [dbo].[Customer] ([Id], [Name], [Email], [Password]) VALUES (4, N'Test3', N'Test3@test.com', N'Test3')
SET IDENTITY_INSERT [dbo].[Customer] OFF

GO

SET IDENTITY_INSERT [dbo].[Product] ON
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (1, N'Microsoft Surface Pro 6 - 12.3" - Core i7 8650U - 16 GB RAM - 512 GB SSD', CAST(2050.99 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (2, N'Microsoft Surface Pro 6 - 12.3" - Core i5 8350U - 8 GB RAM - 256 GB SSD', CAST(1310.99 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (3, N'Microsoft Surface Laptop 2 - 13.5" - Core i5 8350U - 8 GB RAM - 256 GB SSD - US', CAST(1550.99 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (4, N'Lenovo ThinkPad T480 - 14" - Core i5 8350U - 8 GB RAM - 256 GB SSD - US', CAST(1340.00 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (5, N'Microsoft Surface Go - 10" - Pentium Gold 4415Y - 8 GB RAM - 128 GB SSD', CAST(769.00 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (6, N'Microsoft Surface Pro - 12.3" - Core i5 7300U - 8 GB RAM - 256 GB SSD', CAST(1949.00 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (7, N'HP EliteBook 840 G5 - 14" - Core i7 8650U - 16 GB RAM - 512 GB SSD - US', CAST(2445.00 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (8, N'Dell Latitude 5490 - 14" - Core i5 8350U - 8 GB RAM - 256 GB SSD', CAST(1480.00 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (9, N'Lenovo ThinkPad X1 Carbon (6th Gen) - 14" - Core i7 8650U - 16 GB RAM - 512 GB SSD - US', CAST(2889.00 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (10, N'Microsoft Surface Pro 6 - 12.3" - Core i7 8650U - 16 GB RAM - 512 GB SSD', CAST(2050.00 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (11, N'Lenovo ThinkPad P52 - 15.6" - Core i7 8750H - 16 GB RAM - 512 GB SSD - US', CAST(2505.00 AS Decimal(18, 2)))
INSERT INTO [dbo].[Product] ([Id], [Name], [Price]) VALUES (12, N'Apple MacBook Pro with Touch Bar - 15.4" - Core i9 - 16 GB RAM - 512 GB SSD - US', CAST(3345.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[Product] OFF

GO

SET IDENTITY_INSERT [dbo].[Purchase] ON
INSERT INTO [dbo].[Purchase] ([Id], [UserId], [ProductId], [IsDeleted]) VALUES (1, 1, 1, 0)
INSERT INTO [dbo].[Purchase] ([Id], [UserId], [ProductId], [IsDeleted]) VALUES (2, 1, 3, 1)
SET IDENTITY_INSERT [dbo].[Purchase] OFF


GO




