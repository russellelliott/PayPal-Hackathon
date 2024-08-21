import { Block, ImageBlock, PartialImageBlock, NewImageBlock, TextBlock, PartialTextBlock, NewTextBlock } from './block'; // Import club related types
import { pool } from '../db';

export class BlockService {
    // Get all image and text boxes. sort them in order by timestamp which should be the order they appear. also get what type they are.
    public async getAll(): Promise<Block[]> {
        const select = `
            SELECT 
                id, 
                type, 
                content, 
                NULL AS height, 
                NULL AS width, 
                NULL AS src, 
                timestamp, 
                'text' AS blocktype
            FROM textblocks
            UNION ALL
            SELECT 
                id, 
                NULL AS type, 
                NULL AS content, 
                height, 
                width, 
                src, 
                timestamp, 
                'image' AS blocktype
            FROM imageblocks
            ORDER BY timestamp;
        `;
        const query = {
        text: select,
        };
        const { rows } = await pool.query(query);
        return rows;
    }

    // Get all imageblocks
    public async getAllImageBlocks(): Promise<ImageBlock[]> {
        let select = 'SELECT * FROM imageblocks';
        const query = {
            text: select,
        };
        const { rows } = await pool.query(query);
        return rows;
    }

    // Get imageblock by id
    public async getImageBlockById(id: string): Promise<ImageBlock> {
        let select = 'SELECT * FROM imageblocks WHERE id = $1';
        const query = {
            text: select,
            values: [id],
        };
        const { rows } = await pool.query(query);
        return rows.length > 0 ? rows[0] : null;
    }

    // Add a new imageblock
    public async addImageBlock(newImageBlock: NewImageBlock): Promise<ImageBlock> {
        const insertQuery = `
            INSERT INTO imageblocks (id, height, width, src, timestamp)
            VALUES (gen_random_uuid(), $1, $2, $3, CURRENT_TIMESTAMP)
            RETURNING *
        `;
        const insertValues = [
            newImageBlock.height,
            newImageBlock.width,
            newImageBlock.src,
        ];

        const { rows } = await pool.query(insertQuery, insertValues);

        if (rows.length === 1) {
            console.log('Image block added successfully!');
            return rows[0] as ImageBlock;
        } else {
            throw new Error('Failed to add the image block to the database.');
        }
    }

    // Update an existing imageblock by id
    public async updateImageBlock(id: string, updatedProperties: PartialImageBlock): Promise<ImageBlock> {
        const updateValues: any[] = [];
        let updateQuery = 'UPDATE imageblocks SET';

        Object.keys(updatedProperties).forEach((key, index) => {
            updateQuery += ` ${key} = $${index + 1}`;
            updateValues.push(updatedProperties[key]);

            if (index < Object.keys(updatedProperties).length - 1) {
                updateQuery += ',';
            }
        });

        updateQuery += ' WHERE id = $' + (updateValues.length + 1) + ' RETURNING *';
        updateValues.push(id);

        const { rows } = await pool.query(updateQuery, updateValues);
        return rows[0] || null;
    }

    // Delete an imageblock by id
    public async deleteImageBlock(id: string): Promise<ImageBlock | null> {
        const deleteQuery = 'DELETE FROM imageblocks WHERE id = $1 RETURNING *';
        const { rows } = await pool.query(deleteQuery, [id]);
        return rows[0] || null;
    }

    // Get all textblocks
    public async getAllTextBlocks(): Promise<TextBlock[]> {
        let select = 'SELECT * FROM textblocks';
        const query = {
            text: select,
        };
        const { rows } = await pool.query(query);
        return rows;
    }

    // Get textblock by id
    public async getTextBlockById(id: string): Promise<TextBlock> {
        let select = 'SELECT * FROM textblocks WHERE id = $1';
        const query = {
            text: select,
            values: [id],
        };
        const { rows } = await pool.query(query);
        return rows.length > 0 ? rows[0] : null;
    }

    // Add a new textblock
    public async addTextBlock(newTextBlock: NewTextBlock): Promise<TextBlock> {
        const insertQuery = `
            INSERT INTO textblocks (id, type, content, timestamp)
            VALUES (gen_random_uuid(), $1, $2, CURRENT_TIMESTAMP)
            RETURNING *
        `;
        const insertValues = [
            newTextBlock.type,
            newTextBlock.content,
        ];

        const { rows } = await pool.query(insertQuery, insertValues);

        if (rows.length === 1) {
            console.log('Text block added successfully!');
            return rows[0] as TextBlock;
        } else {
            throw new Error('Failed to add the text block to the database.');
        }
    }

    // Update an existing textblock by id
    public async updateTextBlock(id: string, updatedProperties: PartialTextBlock): Promise<TextBlock> {
        const updateValues: any[] = [];
        let updateQuery = 'UPDATE textblocks SET';

        Object.keys(updatedProperties).forEach((key, index) => {
            updateQuery += ` ${key} = $${index + 1}`;
            updateValues.push(updatedProperties[key]);

            if (index < Object.keys(updatedProperties).length - 1) {
                updateQuery += ',';
            }
        });

        updateQuery += ' WHERE id = $' + (updateValues.length + 1) + ' RETURNING *';
        updateValues.push(id);

        const { rows } = await pool.query(updateQuery, updateValues);
        return rows[0] || null;
    }

    // Delete a textblock by id
    public async deleteTextBlock(id: string): Promise<TextBlock | null> {
        const deleteQuery = 'DELETE FROM textblocks WHERE id = $1 RETURNING *';
        const { rows } = await pool.query(deleteQuery, [id]);
        return rows[0] || null;
    }
}