import tw from "tailwind-styled-components";
import MainModal from "../components/MainModal";
import Navbar from "../components/Navbar";
import { readClasses, readPeriods, readUserWithRole } from "./actions";
import RecoilProvider from "./content";
import Sidebar from "./components/Sidebar";

const Main = tw.main`flex-bg-white w-full h-dvh flex flex-col`;
const Container = tw.div`flex h-[calc(100dvh-4rem)]`;
const Content = tw.div`flex-grow flex`;

export default async function PagesLayout(props: {
  children: React.ReactNode;
}) {
  const classes = await readClasses();
  const periods = await readPeriods();
  const users = await readUserWithRole();

  return (
    <Main>
      <MainModal />
      <Navbar />
      <Container>
        <Sidebar />
        <RecoilProvider classes={classes} periods={periods} users={users}>
          <Content>{props.children}</Content>
        </RecoilProvider>
      </Container>
    </Main>
  );
}
