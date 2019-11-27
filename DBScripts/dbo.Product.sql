CREATE TABLE [dbo].[Product] (
    [Id]   INT           NOT NULL IDENTITY,
    [Name] VARCHAR (255) NOT NULL,
    [Price] DECIMAL(18, 2) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

