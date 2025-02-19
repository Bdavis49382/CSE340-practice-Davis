import dbPromise from "../database/index.js";

const getClassifications = async () => {
    const db = await dbPromise;
    return await db.all('SELECT * FROM classification');
};

const getGamesByClassification = async (classificationId) => {
    const db = await dbPromise;
    return await db.all(`
        SELECT game.*, classification.classification_name
        FROM game 
        JOIN classification ON game.classification_id = classification.classification_id
        WHERE game.classification_id = ?
        `
        , [classificationId]);
};

const addNewGame = async (gameName, description, classification_id, image_path='') => {
    const db = await dbPromise;
    return await db.all(`
        INSERT INTO game (game_name, game_description,classification_id, image_path)
        VALUES (?, ?, ?, ?)
        `, [gameName, description, classification_id, image_path]);
}

const getGameById = async (gameId) => {
    const db = await dbPromise;
    const query = `
        SELECT game.*, classification.classification_name 
        FROM game 
        JOIN classification ON game.classification_id = classification.classification_id
        WHERE game.game_id = ?;
    `;
    return await db.get(query, [gameId]);
};
 
async function updateGame(gameId, name, description, classificationId, imagePath = '') {
    const db = await dbPromise;
 
    // If no image was uploaded, update basic game info
    if (imagePath === '') {
        const sql = `
            UPDATE game 
            SET game_name = ?, 
                game_description = ?, 
                classification_id = ?
            WHERE game_id = ?
        `;
        return await db.run(sql, [name, description, classificationId, gameId]);
    }
    // If image was uploaded, update all info including image
    const sql = `
        UPDATE game 
        SET game_name = ?, 
            game_description = ?, 
            classification_id = ?,
            image_path = ?
        WHERE game_id = ?
    `;
    return await db.run(sql, [name, description, classificationId, imagePath, gameId]);
}
async function deleteGame(gameId) {
    const db = await dbPromise;

    const sql = `
        DELETE
        FROM game
        WHERE game_id = ?
    `;
    return await db.run(sql, [gameId]);
}

async function addNewClassification(classification_name) {
    if (!classification_name)
        return;

    const db = await dbPromise;
    const classifications = await getClassifications();
    if (classifications.map(c => c.classification_name).includes(classification_name)) {
        return;
    }
    return await db.all(`
        INSERT INTO classification (classification_name)
        VALUES (?)
        `, [classification_name]);
}

async function moveGamesToClassification(oldId, newId) {
    if (!oldId || !newId)
        return;

    const db = await dbPromise;
    return await db.all(`
            UPDATE game 
            SET classification_id = ?
            WHERE classification_id = ?
        `, [newId, oldId]);
}

async function deleteClassification(id) {
    if (!id)
        return;

    const db = await dbPromise;
    return await db.all(`
            DELETE
            FROM classification
            WHERE classification_id = ?
        `, [id])

}

export { getClassifications, getGamesByClassification , addNewGame, getGameById, updateGame, deleteGame, addNewClassification, moveGamesToClassification, deleteClassification};
