import { Tables } from '@/schema';
import { fetchQuoteProductsById } from '@/utils/fetchers/server/products';
import { fetchQuoteById } from '@/utils/fetchers/server/quotes';
import formatCurrency from '@/utils/format/currency';
import {z} from 'zod'




type QuoteDetailsProps = {
  quote_id: string;
};


const QuoteDetails = async ({  quote_id }: QuoteDetailsProps) => {

  const { products } = await fetchQuoteProductsById(quote_id);

  if (products === null || products.length === 0) {
    <span className="">No Products</span>
  }

  return (
    <div>
      <p className="text-2xl font-semibold">Products</p>
      <div className="flex flex-col">
        {products.map((product) => {
          return (
            <div key={product.products?.name} className="my-2 px-3">
              <div className="flex flex-row w-full border-b px-2 py-1 justify-between items-center">
                <div className="">
                  <p className="text-sm font-semibold">
                    {product.products?.name}
                  </p>
                  <p className="text-sm font-semibold">
                    {formatCurrency(product.products?.price!)} x{" "}
                    <small className="text-sm font-medium">
                      Qty: {product.quantity}
                    </small>
                  </p>
                </div>{" "}
                <p className="text-xl font-semibold">
                  {formatCurrency(product.quantity * product.products?.price!)}
                </p>
              </div>

              <div></div>
            </div>
          );
        })}
        <h3 className="mt-4 flex justify-end text-2xl font-semibold px-3">
          Total:{" "}
          {formatCurrency(
            products.reduce(
              (acc, curr) => acc + curr.quantity * curr.products?.price!,
              0
            )
          )}
        </h3>
      </div>
    </div>
  );
};
export default QuoteDetails;
