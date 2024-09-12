import ItemContainer from "@/components/ItemContainer";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24 bg-gray-900">
      <ItemContainer />
    </main>
  );
}
