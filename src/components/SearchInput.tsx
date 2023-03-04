import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const SearchInput: React.FC = () => {
  const [search, setSearch] = React.useState<string>("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const searchValue = encodeURI(search);

    router.push(`/search?q=${searchValue}`);
  };

  return (
    <form
      className="flex items-center justify-center w-full"
      onSubmit={handleSearch}
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Type something here..."
        className="input"
      />
    </form>
  );
};

export default SearchInput;
