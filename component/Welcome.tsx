import { useUser } from "@/context/UserContext";

const Welcome = () => {
  const { user } = useUser();
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-400">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-amber-900 mb-4">
          ¡Bienvenido{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="text-amber-700 text-lg">
          Nos alegra tenerte de vuelta 😊
        </p>
      </div>
    // </div>
  );
};

export default Welcome;
