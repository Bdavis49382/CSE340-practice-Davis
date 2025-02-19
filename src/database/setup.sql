-- Create the classification table if it doesn't exist
CREATE TABLE IF NOT EXISTS classification (
    classification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    classification_name TEXT UNIQUE NOT NULL
);
 
-- Create the games table if it doesn't exist
CREATE TABLE IF NOT EXISTS game (
    game_id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_name TEXT NOT NULL,
    game_description TEXT NOT NULL,
    classification_id INTEGER NOT NULL,
    image_path TEXT NOT NULL,
    FOREIGN KEY (classification_id) REFERENCES classification(classification_id) ON DELETE CASCADE
);
 
-- Insert initial classifications
INSERT OR IGNORE INTO classification (classification_id, classification_name) VALUES
(1, 'Strategy'),
(2, 'Party');
 
-- Insert initial games
INSERT OR IGNORE INTO game (game_id, game_name, game_description, classification_id, image_path) VALUES
(1, 'Catan', 'A popular resource-trading and city-building game.', 1, '/images/games/catan.jpg'),
(2, 'Risk', 'A world domination game of strategy and conquest.', 1, '/images/games/risk.jpg'),
(3, 'Uno', 'A fast-paced card game of matching colors and numbers.', 2, '/images/games/uno.jpg'),
(4, 'Apples to Apples', 'A fun word association game perfect for family and friends.', 2, '/images/games/apples-to-apples.jpg');