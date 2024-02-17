
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, mediaId }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${mediaId}/recommendations`
    );
        // console.log(mediaType);
    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;