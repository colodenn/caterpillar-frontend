import { useRouter } from "next/router";

export default function pdf() {
  const router = useRouter();
  const { pdf } = router.query;
  return (
    <embed
      type="application/pdf"
      src={`${process.env.NEXT_PUBLIC_SERVERURL}/pdf/${pdf}`}
      width="100%"
      height="100%"
    />
  );
}
