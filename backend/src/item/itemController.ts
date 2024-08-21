import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Patch,
    Query,
    Response,
    Route,
    SuccessResponse,
} from 'tsoa';
import { ItemService } from './itemService'; // Adjust path as needed
import { StoreItem, ShoppingCartItem } from './item'; // Adjust path as needed

@Route('items')
export class ItemController extends Controller {
    @Get('/store')
    @Response('404', 'StoreItem not found')
    public async getAllStoreItems(): Promise<StoreItem[]> {
        return new ItemService().getAllStoreItems();
    }

    @Get('/store/{id}')
    @Response('404', 'StoreItem not found')
    public async getStoreItemById(@Query() id: number): Promise<StoreItem | null> {
        return new ItemService().getStoreItemById(id);
    }

    @Get('/cart')
    @Response('404', 'ShoppingCartItem not found')
    public async getShoppingCartItems(): Promise<{ items: ShoppingCartItem[], total: number }> {
        return new ItemService().getShoppingCartItems();
    }

    @Post('/cart')
    @SuccessResponse('201', 'ShoppingCartItem created')
    public async addShoppingCartItem(
        @Body() body: { itemId: number; quantity: number },
    ): Promise<ShoppingCartItem> {
        return new ItemService().addShoppingCartItem(body.itemId, body.quantity);
    }

    @Patch('/cart')
    @Response('404', 'ShoppingCartItem not found')
    @SuccessResponse('200', 'ShoppingCartItem updated')
    public async updateShoppingCartItem(
        @Body() body: { itemId: number; quantity: number },
    ): Promise<ShoppingCartItem | null> {
        return new ItemService().updateShoppingCartItem(body.itemId, body.quantity);
    }

    @Delete('/cart')
    @Response('404', 'ShoppingCartItem not found')
    @SuccessResponse('204', 'ShoppingCartItem deleted')
    public async removeShoppingCartItem(
        @Query() itemId: number,
    ): Promise<void> {
        const result = await new ItemService().removeShoppingCartItem(itemId);
        if (!result) {
            this.setStatus(404);
        } else {
            this.setStatus(204);
        }
    }
}