import { AuthProvider } from "./contexts";
import { AppRouter } from "./router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const client = new QueryClient();

export const App = () => {
  return (
    <div>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
