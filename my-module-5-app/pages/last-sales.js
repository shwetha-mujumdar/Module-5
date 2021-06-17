import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  // custom states
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-ad4ba-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          Volume: data[key].Volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //custom useEffect function

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-course-ad4ba-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             Volume: data[key].Volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load......</p>;
  }

  if (!data && !sales) {
    return <p>Loading.......</p>;
  }

  return (
    <div>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - ${sale.Volume}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default LastSalesPage;

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-ad4ba-default-rtdb.firebaseio.com/sales.json"
  );

  const data = await response.json();
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      Volume: data[key].Volume,
    });
  }
  return { props: { sales: transformedSales } };
}
