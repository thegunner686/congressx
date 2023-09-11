import { Link, routes } from "@redwoodjs/router";
import { MetaTags, useQuery } from "@redwoodjs/web";
import { useCallback, useEffect, useRef, useState } from "react";
import Bill from "src/components/Bill/Bill/Bill";
import BillCell from "src/components/Bill/BillCell";

const subjects_query = gql`
  query GetSubjects {
    billSubjects {
      id
      name
      type
    }
  }
`;

const bill_search = gql`
  query GetBillsByTitleSearch(
    $searchText: String!
    $order: String!
    $subjectId: String!
  ) {
    bills: searchBillsByTitle(
      searchText: $searchText
      order: $order
      subjectId: $subjectId
    ) {
      id
    }
  }
`;

const throttler = (interval) => {
  let queue = [];

  setInterval(() => {
    const fn = queue.pop();
    if (fn) {
      fn();
      queue = [];
    }
  }, interval);

  return {
    throttle: (fn) => {
      queue.push(fn);
    },
    clear: () => {
      queue = [];
    },
  };
};

const { throttle, clear: clearThrottle } = throttler(1000);

const VotingPage = () => {
  const { data: subjectsData } = useQuery(subjects_query);
  const [billSearchValue, setBillSearchValue] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectFilterOpen, setSubjectFilterOpen] = useState(true);
  const { data: billsData } = useQuery(bill_search, {
    variables: {
      searchText: billSearchValue,
      order: "desc",
      subjectId: selectedSubject?.id ?? "",
    },
  });
  const searchRef = useRef(null);

  useEffect(() => {
    console.log(subjectsData);
  }, [subjectsData]);

  useEffect(() => {
    console.log(billsData);
  }, [billsData]);

  const onSearchChange = useCallback(
    (e) => {
      throttle(() => setBillSearchValue(e.target.value));
    },
    [throttle],
  );

  const clearSearch = useCallback(() => {
    clearThrottle();
    setBillSearchValue("");
    searchRef.current.value = "";
  }, [searchRef]);

  const toggleSubjectFilter = useCallback(() => {
    setSubjectFilterOpen((_prev) => !_prev);
  }, []);

  return (
    <>
      <MetaTags title="Voting" description="Voting page" />
      <main className="flex flex-row items-start justify-start w-full p-4 animate-fade-in transition-all">
        <section className="w-[42rem] h-[40rem] p-2">
          <button
            className="font-archivo text-white flex flex-row items-center justify-around"
            onClick={toggleSubjectFilter}
          >
            Bill Subjects{" "}
            {subjectFilterOpen ? (
              <span className="material-icons">expand_less</span>
            ) : (
              <span className="material-icons">expand_more</span>
            )}
          </button>
          <div
            className={`${
              subjectFilterOpen
                ? "h-full overflow-y-scroll"
                : "h-0 overflow-hidden"
            } transition-all`}
          >
            {[...(subjectsData?.billSubjects ?? [])]
              .sort((b1, b2) => b1.name.localeCompare(b2.name))
              .map((subject) => {
                const current = subject.id === selectedSubject?.id;
                return (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject)}
                    className={`${
                      current
                        ? "bg-blue-700 text-white"
                        : "border border-zinc-600 bg-white bg-opacity-50 text-zinc-600"
                    } font-archivo text-xs p-1 rounded hover:bg-zinc-600 hover:text-zinc-300 transition-all m-1`}
                  >
                    {subject.name}
                  </button>
                );
              })}
          </div>
        </section>
        <section className="flex-grow">
          <div className=" w-3/5">
            <div className="flex flex-row shadow w-full">
              <input
                className="flex-grow rounded-tl  outline-none shadow-zinc-500 p-2 font-archivo text-sm text-zinc-800"
                placeholder="Search by bill title"
                onChange={onSearchChange}
                ref={searchRef}
              />
              <button
                onClick={clearSearch}
                className="font-archivo text-xs lowercase text-zinc-600 hover:bg-zinc-300 transition-all rounded-tr rounded-br px-2 bg-zinc-200"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-row w-full">
              <div className="p-1 px-2 bg-zinc-800 text-zinc-200 rounded-bl-md font-archivo text-xs flex items-center justify-center">
                <span className="material-icons">filter_alt</span>
                Subject
              </div>
              {selectedSubject != null ? (
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="p-1 bg-blue-700 text-white font-archivo rounded-br-lg text-xs flex flex-row items-center justify-center hover:bg-blue-600 transition-all group"
                >
                  {selectedSubject.name}
                  <span className="material-icons group-hover:scale-110 transition-all">
                    close
                  </span>
                </button>
              ) : null}
            </div>
          </div>
          <div className="mt-8">
            {billsData?.bills.map((bill) => {
              return <BillCell id={bill.id} key={bill.id} />;
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default VotingPage;
