import React from "react";
import Body from "./Body";
import Head from "./Head";

interface FilebodyProps {
    folder: {
        id: string;
        name: string;
        path_display: string;
        size: number;
        fileSize: number;
        modifiedDate: string;
        client_modified: string;
        ".tag": string;
        mimeType: string;
        title: string;
    }[];
    handleClickDropbox: (
        e: React.MouseEvent<HTMLAnchorElement>,
        pathBack: string
    ) => void;
    handleClickGoogle: (
        e: React.MouseEvent<HTMLAnchorElement>,
        pathBack: string,
        name: string
    ) => void;
}

const Filebody: React.FC<FilebodyProps> = ({
    folder,
    handleClickDropbox,
    handleClickGoogle,
}) => {
    return (
        <table className="table table-bordered table table-condensed">
            <Head />
            <tbody>
                {folder.length > 0 ? (
                    folder.map((item, index) => {
                        return (
                            <Body
                                key={index}
                                handleClickDropbox={handleClickDropbox}
                                handleClickGoogle={handleClickGoogle}
                                item={item}
                                index={index}
                            />
                        );
                    })
                ) : (
                    <tr>
                        <td
                            style={{ textAlign: "center", fontWeight: "bold" }}
                            colSpan={4}
                        >
                            Папка пуста
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Filebody;
