import React from "react";
import { getArtDetail, getArtIndex } from "../../helpers";
import ArtDetailPage from "../../components/ArtDetailPage";

const ArtDetail = ({ project }) =>
  project ? <ArtDetailPage project={project} /> : <div>Loading</div>;

export const getStaticPaths = async () => {
  const projects = await getArtIndex();
  return {
    fallback: true,
    paths: projects.map(({ id }) => `/art/${id}`),
  };
};

export const getStaticProps = async ({ params }) => {
  const project = await getArtDetail(params.id);
  return {
    revalidate: 60,
    props: {
      project,
    },
  };
};

export default ArtDetail;
