import { MetaTags, useMutation, useQuery } from "@redwoodjs/web";
import { useCallback, useEffect } from "react";
import RepresentativeCell from "src/components/Representative/RepresentativeCell";
import StateCell from "src/components/State/StateCell";
import StatesCell from "src/components/State/StatesCell";
import { useRepresentativesContext } from "src/contexts/RepresentativesContext";
import { useUserContext } from "src/contexts/UserContext";
import { useState } from "react";
import { update_user } from "src/components/State/State";

const state_query = gql`
  query GetStateInfo($id: String!) {
    state(id: $id) {
      id
      name
      districts {
        number
        representative {
          imageUrl
          directOrderName
        }
      }
    }
  }
`;

const StateSelectionPage = () => {
  const user = useUserContext();
  const representatives = useRepresentativesContext();
  const { data: stateData } = useQuery(state_query, {
    variables: {
      id: user?.stateId,
    },
  });
  const [updateUser] = useMutation(update_user, {
    refetchQueries: ["FindUserById"],
  });
  const [loading, setLoading] = useState(false);

  const setUserDistrict = useCallback(
    async (newDistrict) => {
      setLoading(true);

      try {
        await updateUser({
          variables: {
            id: user?.id,
            input: {
              districtNumber: newDistrict,
            },
          },
        });
      } finally {
        setLoading(false);
      }
    },
    [user?.id],
  );

  return (
    <>
      <MetaTags title="StateSelection" description="StateSelection page" />
      <main className="flex flex-col items-center justify-center w-full animate-fade-in transition-all">
        {user?.state ? (
          <>
            <div className="flex flex-row w-full">
              <section className="flex-1 h-full rounded-lg bg-opacity-95 flex flex-col items-center p-2 pb-8">
                <div className="w-full p-4 flex flex-row items-center justify-around">
                  <h3 className="text-white text-2xl font-archivo">
                    Your Representatives
                  </h3>
                </div>
                {representatives?.map(({ id }) => {
                  return <RepresentativeCell key={id} id={id} />;
                })}
              </section>
              <section className="flex-1 flex flex-col items-center justify-start bg-night bg-opacity-80 pb-8">
                <div className="p-4">
                  <StateCell id={user.stateId} />
                </div>
                <div className="flex w-9/12 py-4">
                  {stateData?.state?.districts != null && (
                    <h3 className="text-zinc-500 font-archivo">
                      {stateData.state.districts.length} District
                      {stateData.state.districts.length > 1
                        ? "s"
                        : null} in {stateData.state.name}
                    </h3>
                  )}
                  {/* {districtSelectOpen ? (
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
                  )} */}
                </div>
                {stateData?.state?.districts ? (
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 w-9/12 mx-auto">
                    {[...stateData.state.districts]
                      .sort((d1, d2) => d1.number - d2.number)
                      .map((district) => {
                        const current =
                          user?.district.number == district.number;
                        return (
                          <button
                            key={district.number}
                            className={`${loading ? `animate-pulse` : null} ${
                              current
                                ? `border-r-8 border-r-verdigris shadow-lg shadow-verdigris`
                                : `border-none`
                            } bg-night h-16 flex flex-row items-center justify-start w-full rounded cursor-pointer hover:scale-95 transition-all hover:bg-zinc-900`}
                            onClick={() => {
                              setUserDistrict(district.number);
                            }}
                            disabled={loading}
                          >
                            <img
                              src={district.representative.imageUrl}
                              className="h-16 w-16 object-cover rounded object-top"
                            />
                            <div className="p-1 flex flex-col items-center justify-center w-full">
                              <h3 className="text-white text-xs font-archivo">
                                {district.representative.directOrderName}
                              </h3>
                              <h3 className="text-zinc-300 font-archivo">
                                District {district.number}
                              </h3>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                ) : null}
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
