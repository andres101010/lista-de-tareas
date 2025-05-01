import Title from "@/component/Title";
import { Props } from "@/type/types"; 
import Tasks from "@/component/Tasks";

const Home = async (props: Props) => {
  // Al ser un componente asíncrono, debemos esperar para usar params correctamente
  // const { id } = params;
  const { id } = await props.params;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Title title="TAREAS" />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* contenido */}
        <Tasks id={id}/>
      </main>
    </div>
  );
};

export default Home;
