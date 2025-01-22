import Link from 'next/link'
export const menuItems = [
  {
    title: "Men's Shoes",
    subtitle: "Explore the latest Nike shoes for men, built for performance and style.",
    href: "/shop?category=men",
  },
  {
    title: "Women's Shoes",
    subtitle: "Discover Nike's collection of shoes designed for women with comfort and style.",
    href: "/shop?category=women",
  },
  {
    title: "Kids",
    subtitle: "Comfortable and durable shoes designed for kids of all ages.",
    href: "/shop?category=kids",
  },
  {
    title: "Accessories",
    subtitle: "Enhance your performance with Nike's premium socks, bags, and more.",
    href: "/shop?category=accessories",
  },
];


export function ShopMenu() {
  return (
    <div className="absolute top-full left-0 w-[600px] bg-white shadow-lg rounded-lg p-6 grid grid-cols-2 gap-6 z-50">
      {menuItems.map((item) => (
        <Link 
          key={item.title} 
          href={item.href}
          className="block group"
        >
          <h3 className="text-base font-medium group-hover:text-gray-600">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {item.subtitle}
          </p>
        </Link>
      ))}
    </div>
  )
}

