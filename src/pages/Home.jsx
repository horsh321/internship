import { useFetch } from "@/hooks";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader, Texts } from "@/components";
import { getRandomAdvice } from "@/services";
import { desktopDivider, iconDice, mobileDivider } from "@/assets";
import { Alert, Card, Image } from "react-bootstrap";

const Home = () => {
  const { id } = useParams();
  const [randomAdvice, setRandomAdvice] = useState(null);
  const [fetchKey, setFetchKey] = useState(0);
  const { data, error, isLoading } = useFetch(getRandomAdvice, id, fetchKey);
  

  useEffect(() => {
    if (data.slip && !randomAdvice) {
      const adviceArray = Object.values(data.slip);
      const randomIndex = Math.floor(Math.random() * adviceArray.length);
      console.log("Calling setRandomAdvice with:", adviceArray[randomIndex]);
      setRandomAdvice({ advice: adviceArray[1], id: adviceArray[0] });
    }
  }, [data, randomAdvice]);

  const handleNewAdvice = () => {
    setFetchKey((prevKey) => prevKey + 1);
    setRandomAdvice(null);
    console.log(data);
  };


  return (
    <>
      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}
      {isLoading && <Loader />}
      {!error && !isLoading && data && (
        <Card
          style={{ maxWidth: "500px", maxHeight: "400px" }}
          className="card shadow-sm rounded-4  text-center p-2 p-lg-3 "
        >
          {randomAdvice && (
            <Card.Box key={randomAdvice.id}>
              <Texts
                text={
                  <>
                    ADVICE <span> #{`${randomAdvice.id}`}</span>
                  </>
                }
                size="0.75rem"
                color="var(--Neon-Green)"
                className="textSpacing fw-medium"
              />

              <blockquote>
                <Texts
                  text={`"${randomAdvice.advice}"`}
                  size="1.5rem"
                  className="fw-bold"
                  color="var(--Light-Cyan)"
                />
              </blockquote>
              <br />
              <Image
                src={desktopDivider}
                className="position-absolute desktopDivider d-none d-lg-block"
              />
              <Image
                src={mobileDivider}
                className="position-absolute mobileDivider d-lg-none"
              />
              <Link className="roundBox position-absolute" onClick={handleNewAdvice}>
                <Image src={iconDice} alt="icon-dice" />
              </Link>
            </Card.Box>
          )}
        </Card>
      )}
    </>
  );
};

export default Home;
