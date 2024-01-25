import "./App.css";
import { Newsletter } from "./components/Newsletter/Newsletter";
import { ArchiveBreadCumb } from "./components/SingleArchive/Breadcumb";
import { SingleArchive } from "./components/SingleArchive/SingleArchive";

function Archive() {
    return (
        <>
            <ArchiveBreadCumb />
            <SingleArchive />
            <Newsletter />
        </>
    );
}

export default Archive;
