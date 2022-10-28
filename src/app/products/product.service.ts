import { Product } from './product.model';

export class ProductService {
  private products: Product[] = [
    new Product(
      'iPhone 14 Pro 256 GB',
      'P001',
      'https://istyle.ro/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/c/z/czcs_iphone14pro_q422_deep-purple_pdp-images_position-1a_t_4_8_2.jpg',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum molestiae culpa cum illo quisquam nulla reprehenderit obcaecati repellendus dicta ipsa maxime at, labore, qui ab!',
      7000,
      'Smartphones'
    ),
    new Product(
      'iPhone 13 Pro 256 GB',
      'P002',
      'https://istyle.ro/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_13_pro_max_sierra_blue_pdp_image_position-1a__wwen_9_3.jpg',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum molestiae culpa cum illo quisquam nulla reprehenderit obcaecati repellendus dicta ipsa maxime at, labore, qui ab!',
      5000,
      'Smartphones'
    ),
    new Product(
      'Dell XPS 15 9520',
      'P003',
      'https://www.notebookcheck.net/fileadmin/_processed_/c/9/csm_XPS_15_front_black26_e100527702.jpg',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum molestiae culpa cum illo quisquam nulla reprehenderit obcaecati repellendus dicta ipsa maxime at, labore, qui ab!',
      9000,
      'Laptops'
    ),
    new Product(
      'AirPods 2nd Gen.',
      'P004',
      'https://images.macrumors.com/t/eqsWkSXwGRWnr4wti3_f979_pt8=/400x0/article-new/2018/02/airpods2-800x688.jpg',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum molestiae culpa cum illo quisquam nulla reprehenderit obcaecati repellendus dicta ipsa maxime at, labore, qui ab!',
      1200,
      'Accesories'
    ),
    new Product(
      'Dell P2422H',
      'P005',
      'https://p1.akcdn.net/full/829330863.dell-p2422h.jpg',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum molestiae culpa cum illo quisquam nulla reprehenderit obcaecati repellendus dicta ipsa maxime at, labore, qui ab!',
      900,
      'Monitors'
    ),
  ];

  getProducts(selectedCategories: any) {
    let toReturn: any;

    if (selectedCategories === 'All') {
      console.log(selectedCategories);
      return this.products.slice();
    } else {
      console.log('o intrat bine');
    }

    return this.products
      .slice()
      .filter((product) => product.category.includes(selectedCategories));
  }

  getProduct(sku: string) {
    const sliced = this.getProducts('All');
    let tolog = sliced.filter((p) => {
      return p.sku === sku;
    });
    return tolog;
  }
}
