import Navbar from "~/app/Navbar/Navbar";

interface StreamProps {}

const Stream: React.FC<StreamProps> = () => {
	return (
		<section className="relative h-full">
			<Navbar />
		</section>
	);
};
export default Stream;
