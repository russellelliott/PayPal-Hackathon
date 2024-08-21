import { pool } from '../db';
import { StoreItem, ShoppingCartItem } from './item'; // Adjust path as needed

export class ItemService {
    // Fetch all store items from the database
    public async getAllStoreItems(): Promise<StoreItem[]> {
        const query = 'SELECT * FROM store_items';
        const { rows } = await pool.query(query);
        return rows;
    }

    // Fetch a store item by ID
    public async getStoreItemById(id: number): Promise<StoreItem | null> {
        const query = 'SELECT * FROM store_items WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Fetch all shopping cart items with their details and calculate the total price
    public async getShoppingCartItems(): Promise<{ items: ShoppingCartItem[], total: number }> {
        const query = `
            SELECT shopping_cart.item_id, shopping_cart.quantity, store_items.name, store_items.price
            FROM shopping_cart
            JOIN store_items ON shopping_cart.item_id = store_items.id
        `;
        const { rows } = await pool.query(query);
        
        // Calculate total price
        let total = 0;
        rows.forEach((item: any) => {
            total += item.price * item.quantity;
        });

        return {
            items: rows,
            total: total
        };
    }

    // Add an item to the shopping cart
    public async addShoppingCartItem(itemId: number, quantity: number): Promise<ShoppingCartItem> {
        const insertQuery = `
            INSERT INTO shopping_cart (item_id, quantity)
            VALUES ($1, $2)
            RETURNING *`;
        const insertValues = [itemId, quantity];
        const { rows } = await pool.query(insertQuery, insertValues);
        return rows[0];
    }

    // Update the quantity of an item in the shopping cart
    public async updateShoppingCartItem(itemId: number, quantity: number): Promise<ShoppingCartItem | null> {
        const updateQuery = `
            UPDATE shopping_cart
            SET quantity = $1
            WHERE item_id = $2
            RETURNING *`;
        const updateValues = [quantity, itemId];
        const { rows } = await pool.query(updateQuery, updateValues);
        return rows.length > 0 ? rows[0] : null;
    }

    // Remove an item from the shopping cart
    public async removeShoppingCartItem(itemId: number): Promise<ShoppingCartItem | null> {
        const deleteQuery = `
            DELETE FROM shopping_cart
            WHERE item_id = $1
            RETURNING *`;
        const { rows } = await pool.query(deleteQuery, [itemId]);
        return rows.length > 0 ? rows[0] : null;
    }
}