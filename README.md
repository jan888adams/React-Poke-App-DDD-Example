## Getting Started

### Running the Application

```bash
docker compose up -d
```

The application will be available at `http://localhost` (port 80)

## Architecture

This project follows the principles of **Domain-Driven Design (DDD)**. The codebase is divided into four main layers:

### 1. Presentation Layer

Handles the user interface and user interactions.Organized as a React application.

### 2. Domain Layer

Represents the core business logic and rules.

### 3. Application Layer

Implements use cases and application-specific logic.

### 4. Infrastructure Layer

Manages external integrations and technical details.

### Design Decisions

#### 1. Handling Cart Changes Without Domain Events

Domain events are not used to handle cart changes. Instead, the application layer directly manages these events.Cart change events are primarily needed to update the UI, and the application layer is better suited for this responsibility. Introducing domain events for this purpose would add unnecessary complexity, as the domain and application layer does not need to react to these events.

#### 2. Defining Repositories in the Domain Layer

Repositories are defined in the domain layer rather than the application layer. While repositories could be placed in the application layer, defining them in the domain layer ensures that the core business logic remains cohesive and encapsulated. This approach aligns with the principle of keeping domain logic close to the entities it operates on.

#### 3. Using a Separate Presentation Layer for the UI

A dedicated presentation layer is used for the UI, rather than placing it in the infrastructure layer. The presentation layer is structured like a typical React application and contains both the UI components and the logic for managing application state. While it is possible to move some UI-related logic to the application layer, the preference is to keep this logic close to the UI, making it specific to the React application.
