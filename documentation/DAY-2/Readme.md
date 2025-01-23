# Project Overview

**NikeStore** is a modern and responsive e-commerce platform designed for all Nike products, offering a specialized marketplace for sportswear, footwear, accessories, and more. Built with innovative technologies, this platform ensures a seamless shopping experience for Nike enthusiasts.

The project leverages **Sanity CMS** for efficient content management and **Next.js** for a dynamic and scalable frontend, ensuring smooth interaction between backend systems and the user interface. Key features include real-time updates, intuitive search and navigation, and secure payment and shipment tracking integrations.

The vision for **NikeStore** is to become the go-to marketplace for all Nike products, combining cutting-edge technology with a user-friendly design. This project highlights scalability, efficiency, and a Nike-first approach, providing a unique and comprehensive shopping experience. 🚀

## Day 2: Planning the Technical Foundation

### System Architecture

Here’s the high-level system architecture diagram illustrating how the components interact:
1. **Frontend (Next.js):** The user interface for browsing products.
2. **Sanity CMS:** Acts as the backend, managing data like product listings and user information.
3. **Product Data API:** Fetches product information from Sanity CMS for dynamic display on the frontend.
4. **Third-Party API:** Handles integrations like shipment tracking and payment processing.
5. **Shipment Tracking API:** Fetches real-time order delivery status.
6. **Payment Gateway:** Processes payments securely and sends payment confirmations back to Sanity CMS.

### Key Workflow Steps

1. **Product Browsing:** The frontend requests product listings via the Product Data API connected to Sanity CMS.
2. **Order Placement:** The user places an order; details are sent to Sanity CMS via an API request.
3. **Shipment Tracking:** Order shipment data is fetched through the Third-Party API and displayed on the frontend.

### Technologies

**Frontend:**
- Next.js: For building server-rendered, dynamic UIs.
- Tailwind CSS: For responsive and beautiful designs.
- Shadcn/UI: For customizable UI components.

**Backend:**
- Sanity CMS: To manage and structure content effectively.
- Clerk: For user authentication and management.

**APIs:**
- ShipEngine API: For shipment tracking and delivery management.
- Stripe API: For secure and seamless payment processing.

**Tools:**
- GitHub: For version control and collaboration.
- Postman: To test and document APIs.
- Vercel: For fast and reliable deployment.

### API Endpoints

Here are the main API endpoints we'll be working with:

| Endpoint                          | Method | Description                                      |
|-----------------------------------|--------|--------------------------------------------------|
| `/api/create-order`               | POST   | Creates a new order when someone buys something  |
| `/api/orders`                     | GET    | Fetches all orders (admin stuff)                 |
| `/api/shipengine/create-label`    | POST   | Makes a shipping label for orders                |
| `/api/shipengine/get-rates`       | GET    | Checks shipping costs                            |
| `/api/shipengine/track-shipment`  | GET    | Tracks where a shipment is                       |
| `/api/track-orders`               | GET    | Lets users see all of their orders               |
| `/api/send/confirmation-email`    | POST   | Sends an email to confirm an order               |

### API Documentation

#### Add a Review for a Product

**Endpoint:** `/api/reviews/:productId`  
**Method:** `POST`  
**Description:** Adds a review for a product.

**Parameters:**
- `productId` (String): The unique identifier of the product.

**Success Response:**
- **Code:** 201 Created  
        **Content:**
        ```json
        {
                        "id": "12345",
                        "productId": "67890",
                        "content": "Great product!",
                        "rating": 5,
                        "createdAt": "2023-10-01T12:34:56Z"
        }
        ```

**Error Response:**
- **Code:** 400 Bad Request  
        **Content:**
        ```json
        {
                        "errorMessage": "Invalid product ID"
        }
        ```

**Example Request:**
```json
{
                "content": "Great product!",
                "rating": 5
}
```

**Example Success Response:**
```json
{
                "id": "12345",
                "productId": "67890",
                "content": "Great product!",
                "rating": 5,
                "createdAt": "2023-10-01T12:34:56Z"
}
```

**Example Error Response:**
```json
{
                "errorMessage": "Invalid product ID"
}
```

### Sanity and Next.js Interaction

Sanity CMS is integrated into the Next.js application to provide dynamic and flexible content management. The interaction works as follows:

1. **Data Management in Sanity:** All the e-commerce data (e.g., products, orders, customers) is stored and managed in Sanity's content studio.
2. **Fetching Data:** Next.js fetches data from Sanity using GROQ queries via Sanity's API endpoints. These queries retrieve structured content, ensuring high flexibility.
3. **Server-side Rendering (SSR):** For dynamic pages like product detail pages, order details page.
4. **Static Site Generation (SSG):** Pages like home and category pages are pre-rendered at build time.
5. **Real-time Updates:** Sanity's webhooks notify the application of changes, enabling immediate updates without manual rebuilds.
6. **Rendering Components:** The fetched data is passed to React components for rendering dynamic and interactive user interfaces.

This seamless integration ensures a robust and scalable e-commerce platform.

### Conclusion

Day 2 of the hackathon focused on laying the technical foundation for our project, transitioning from business ideation to actionable technical planning. By defining technical requirements, designing a robust system architecture, planning API integrations, and drafting technical documentation, we established a clear roadmap for implementation. Collaborative discussions allowed the team to refine ideas, ensuring alignment with industry best practices and project goals.

This day’s efforts have set the stage for a seamless development process in the coming days, with a well-structured plan to guide execution. As we move forward, our focus will shift to coding, testing, and delivering a functional and scalable solution. By adhering to the submission guidelines and maintaining a collaborative spirit, we are confident in achieving a successful project outcome.
