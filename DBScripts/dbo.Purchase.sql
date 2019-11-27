CREATE TABLE [dbo].[Purchase] (
    [Id]        INT NOT NULL IDENTITY,
    [UserId]    INT NOT NULL,
    [ProductId] INT NOT NULL,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Purchase_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Customer] ([Id]),
    CONSTRAINT [FK_Purchase_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id])
);

