import { MetaTags, useMutation } from "@redwoodjs/web";
import { useCallback, useEffect } from "react";
import RepresentativeCell from "src/components/Representative/RepresentativeCell";
import StateCell from "src/components/State/StateCell";
import StatesCell from "src/components/State/StatesCell";
import { useRepresentativesContext } from "src/contexts/RepresentativesContext";
import { useUserContext } from "src/contexts/UserContext";
import { useState } from "react";
import { update_user } from "src/components/State/State";

const StateSelectionPage = () => {
  const user = useUserContext();
  const representatives = useRepresentativesContext();
  const [districtSelectOpen, setDistrictSelectOpen] = useState(false);
  const [districtSelection, setDistrictSelection] = useState(
    user?.district?.number ?? 1,
  );
  const [updateUser] = useMutation(update_user, {
    refetchQueries: ["FindUserById"],
  });
  const [loading, setLoading] = useState(false);

  const toggleDistrictSelect = () => setDistrictSelectOpen((_prev) => !_prev);

  const setUserDistrict = useCallback(async () => {
    setLoading(true);

    try {
      console.log(user.id, districtSelection);
      await updateUser({
        variables: {
          id: user?.id,
          input: {
            districtNumber: districtSelection,
          },
        },
      });
    } finally {
      setLoading(false);
      toggleDistrictSelect();
    }
  }, [user?.id, districtSelection]);

  return (
    <>
      <MetaTags title="StateSelection" description="StateSelection page" />
      <main className="flex flex-col items-center justify-center w-full p-4 animate-fade-in transition-all">
        {user?.state ? (
          <>
            <div className="flex flex-row w-full">
              <section className="flex-1 h-full rounded-lg bg-opacity-95 flex flex-col items-center p-2 pb-8">
                <div className="w-full p-4 flex flex-row items-center justify-around">
                  <h3 className="text-white text-2xl font-archivo">
                    Your Representatives
                  </h3>
                  {districtSelectOpen ? (
                    <div className="flex flex-row items-center justify-center bg-green-900 text-green-200 font-archivo rounded p-1 px-2">
                      <div>Select District</div>
                      <select
                        className="bg-green-900 p-2 rounded cursor-pointer outline-none"
                        onChange={(event) => {
                          setDistrictSelection(parseInt(event.target.value));
                        }}
                        value={districtSelection}
                      >
                        {[...(user?.state?.districts ?? [])]
                          .sort((d1, d2) => d1.number - d2.number)
                          .map(({ number }) => {
                            return (
                              <option key={number} value={number}>
                                {number}
                              </option>
                            );
                          })}
                      </select>
                      <button
                        disabled={loading}
                        className="text-green-950 uppercase text-sm mx-2 cursor-pointer hover:text-green-200"
                        onClick={setUserDistrict}
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <div
                      className="text-green-200 font-archivo p-2 rounded w-fit cursor-pointer hover:bg-green-900 transition-all flex flex-row items-center justify-center"
                      onClick={toggleDistrictSelect}
                    >
                      <span className="material-icons mr-2">add_home</span>
                      Change District
                    </div>
                  )}
                </div>
                {representatives?.map(({ id }) => {
                  return <RepresentativeCell key={id} id={id} />;
                })}
              </section>
              <section className="flex-1 flex items-center justify-center">
                <StateCell id={user.stateId} />
              </section>
            </div>
          </>
        ) : (
          <StatesCell />
        )}
      </main>
    </>
  );
};

export default StateSelectionPage;
