import React from "react";

import Presentation from "~/app/_components/Presentation/Presentation";

const page = ({ params }: { params: { id: string } }) => (
  <Presentation id={params.id} />
);
export default page;
