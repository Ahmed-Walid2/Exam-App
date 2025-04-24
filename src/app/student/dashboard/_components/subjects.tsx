import Image from "next/image";
import Link from "next/link";
import getSubjects from "../api/subjects.api";

export default async function Subjects() {
  // Fetch Subjects
  const payload = await getSubjects();

  return (
    <section className="px-[16px]  bg-white shadow-dashboard-container py-[32px]  rounded-2xl ml-[72px] w-[1062px]">
      {/* Quzzies & View */}
      <div className="flex mb-[24px] pl-[16px] justify-between items-center">
        <p className="text-primary-color text-2xl font-medium">Quizzes</p>
        <p className="text-primary-color text-2xl font-medium">View All</p>
      </div>

      {/* Subjects */}
      <ul className="details-box px-[16px] grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6 ">
        {payload?.subjects.map((subject) => (
          <Link
            href={"/student/select-diploma"}
            key={subject._id}
            className="w-fit
"
          >
            <li className="rounded-lg relative img-gradiant">
              <Image
                className="w-[330px] h-[292px] rounded-lg object-cover"
                src={subject.icon}
                alt={subject.name}
                width={330}
                height={292}
              />
              <div className="title-box bg-[#1935CA66] p-[15px] rounded-xl  absolute top-[199px] left-[20px] w-[276px] backdrop-filter: blur[27px]">
                <p className="text-white text-xs">{subject.name}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
