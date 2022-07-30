import React from "react";
import img1 from "../../Resource/notFound.svg";
class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <div className="container mx-auto w-screen ">
          <div className="min-h-full flex-col flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div>
              <img src={img1} width="400" alt="link no encontrado"></img>
            </div>
            <div className="text-center">
              <h3 className="text-xl p-2 font-semibold italic mt-3">
                Opps, parece que estas en medio de la nada
              </h3>
              <h3 className="text-lg p-2 text-gray-500 font-normal">
                Déjame guiarte de
                <span className="text-indigo-600">
                  <a href="/"> regreso a casa</a>
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
