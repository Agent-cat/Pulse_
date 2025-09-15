import React, { useState, useMemo } from "react";
import { Mail, MapPin, User, CreditCard } from "lucide-react";

// Mock data for demonstration
const facultyData = [
  {
    "S.No.": 1,
    "Emp ID": 841,
    "Name of the Faculty": "Dr.M.Suman",
    Designation: "Director-Registrations& Examinations",
    Mobile: 9848187437,
    "mail ID": "suman.maloji@kluniversity.in",
    "Room No": "",
    "Cabin No": "",
  },
  {
    "S.No.": 2,
    "Emp ID": 6362,
    "Name of the Faculty": "Dr.Habibulla Khan",
    Designation: "Advisor Student affairs",
    Mobile: 9866027210,
    "mail ID": "habibulla@kluniversity.in",
    "Room No": "C106A",
    "Cabin No": "C106A",
  },
  {
    "S.No.": 3,
    "Emp ID": 731,
    "Name of the Faculty": "Dr.M.Venkata Narayana",
    Designation: "Director Placement & Progration",
    Mobile: 9490560206,
    "mail ID": "mvn@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1B1",
  },
  {
    "S.No.": 4,
    "Emp ID": 855,
    "Name of the Faculty": "Dr.I.Govardhani",
    Designation: "Principal ASC",
    Mobile: 9573548993,
    "mail ID": "govardhanee_ec@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1B3",
  },
  {
    "S.No.": 5,
    "Emp ID": 928,
    "Name of the Faculty": "Dr.K.Ch.Sri Kavya",
    Designation: "Director, Alumni",
    Mobile: 9573943055,
    "mail ID": "kavya@kluniversity.in",
    "Room No": "R611",
    "Cabin No": "R611",
  },
  {
    "S.No.": 6,
    "Emp ID": 2457,
    "Name of the Faculty": "Dr.K.Hari Kishore",
    Designation: "Director-Sports & Games",
    Mobile: 9440959907,
    "mail ID": "kakarla.harikishore@kluniversity.in",
    "Room No": "C115",
    "Cabin No": "C115",
  },
  {
    "S.No.": 7,
    "Emp ID": 2469,
    "Name of the Faculty": "Dr.M.Sridhar",
    Designation: "Assistant Principal-1",
    Mobile: 9885480775,
    "mail ID": "Sridhar.m@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1A6",
  },
  {
    "S.No.": 8,
    "Emp ID": 2684,
    "Name of the Faculty": "Dr.D.Venkata Ratnam",
    Designation: "Research HOD",
    Mobile: 8179100442,
    "mail ID": "dvratnam@kluniversity.in",
    "Room No": "L701",
    "Cabin No": "L701",
  },
  {
    "S.No.": 9,
    "Emp ID": 2838,
    "Name of the Faculty": "Dr.G.V.Subbarao",
    Designation: "Professor",
    Mobile: 9705109991,
    "mail ID": "gvs0raos@kluniversity.in",
    "Room No": "L702",
    "Cabin No": "L702",
  },
  {
    "S.No.": 10,
    "Emp ID": 3388,
    "Name of the Faculty": "Dr.A.S.C.S.Sastry",
    Designation: "Controller of Examination",
    Mobile: 9848099508,
    "mail ID": "ascssastry@kluniversity.in",
    "Room No": "L409",
    "Cabin No": "L409",
  },
  {
    "S.No.": 11,
    "Emp ID": 3413,
    "Name of the Faculty": "Dr. Md.Z Rahman",
    Designation: "Professor",
    Mobile: 9440712707,
    "mail ID": "mdzr@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1A10",
  },
  {
    "S.No.": 12,
    "Emp ID": 3452,
    "Name of the Faculty": "Dr.P.Venkat Vijay Kishore",
    Designation: "Professor",
    Mobile: 9866535444,
    "mail ID": "pvvkishore@kluniversity.in",
    "Room No": "L703",
    "Cabin No": "L703",
  },
  {
    "S.No.": 13,
    "Emp ID": 3867,
    "Name of the Faculty": "Dr.K.Srinivasarao",
    Designation: "Professor",
    Mobile: 7095666644,
    "mail ID": "drksrao@kluniversity.in",
    "Room No": "L706",
    "Cabin No": "L706",
  },
  {
    "S.No.": 14,
    "Emp ID": 4621,
    "Name of the Faculty": "Dr.M.Sujatha",
    Designation: "Professor Dy-HOD",
    Mobile: 9941353997,
    "mail ID": "sujakartsik77@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1A3",
  },
  {
    "S.No.": 15,
    "Emp ID": 2979,
    "Name of the Faculty": "Dr.V.Rajesh",
    Designation: "Professor",
    Mobile: 8186044466,
    "mail ID": "rajesh4444@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A18",
  },
  {
    "S.No.": 16,
    "Emp ID": 8622,
    "Name of the Faculty": "Dr. Santosh Kumar",
    Designation: "Professor",
    Mobile: 7060194847,
    "mail ID": "santosh@kluniversity.in",
    "Room No": "C610",
    "Cabin No": "C610",
  },
  {
    "S.No.": 17,
    "Emp ID": 5808,
    "Name of the Faculty": "Dr.M.Siva Ganga Prasad",
    Designation: "Professor",
    Mobile: 9491956535,
    "mail ID": "msivagangaprasad@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3A2",
  },
  {
    "S.No.": 18,
    "Emp ID": 1181,
    "Name of the Faculty": "Dr.M.Ravi Kumar",
    Designation: "Associate Professor",
    Mobile: 9000145454,
    "mail ID": "ravikumar@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A14",
  },
  {
    "S.No.": 19,
    "Emp ID": 2045,
    "Name of the Faculty": "Dr.K.Ravi kumar",
    Designation: "Addl.Controller of Examination",
    Mobile: 9581519781,
    "mail ID": "ravi.engg38@kluniversity.in",
    "Room No": "L409",
    "Cabin No": "L409",
  },
  {
    "S.No.": 20,
    "Emp ID": 2224,
    "Name of the Faculty": "Dr.G.Venkata Ganesh",
    Designation: "Associate Professor",
    Mobile: 9908010199,
    "mail ID": "ganeshgorla_ece@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1A5",
  },
  {
    "S.No.": 21,
    "Emp ID": 2455,
    "Name of the Faculty": "Dr.M.Siva Kumar",
    Designation: "Associate Professor",
    Mobile: 8985822821,
    "mail ID": "msivakumar@kluniversity.in",
    "Room No": "M001",
    "Cabin No": "M001",
  },
  {
    "S.No.": 22,
    "Emp ID": 2456,
    "Name of the Faculty": "Dr.Syed Inthiyaz",
    Designation: "Assoc.Dean -P&D",
    Mobile: 9160222782,
    "mail ID": "syedinthiyaz@kluniversity.in",
    "Room No": "C316",
    "Cabin No": "C316",
  },
  {
    "S.No.": 23,
    "Emp ID": 2488,
    "Name of the Faculty": "Dr.Fazal Noorbasha",
    Designation: "Assoc.Dean-Academics",
    Mobile: 9000502785,
    "mail ID": "fazalnoorbasha@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1A2",
  },
  {
    "S.No.": 24,
    "Emp ID": 2497,
    "Name of the Faculty": "Dr.Syed Shameem",
    Designation: "Associate Professor",
    Mobile: 9848180207,
    "mail ID": "Shameemsyed@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1A9",
  },
  {
    "S.No.": 25,
    "Emp ID": 2902,
    "Name of the Faculty": "Dr.G.R.K.Prasad",
    Designation: "Assoc.Dean-P&D",
    Mobile: 7729988585,
    "mail ID": "ramguda1978@kluniversity.in",
    "Room No": "C316",
    "Cabin No": "C316",
  },
  {
    "S.No.": 26,
    "Emp ID": 2978,
    "Name of the Faculty": "Dr.D.Bhavana",
    Designation: "Associate Professor",
    Mobile: 9494480740,
    "mail ID": "bhavanaece@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A17",
  },
  {
    "S.No.": 27,
    "Emp ID": 2980,
    "Name of the Faculty": "Dr.V.Subba Reddy",
    Designation: "Assistant Professor",
    Mobile: 9441786858,
    "mail ID": "subbu.vasipalli@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A16",
  },
  {
    "S.No.": 28,
    "Emp ID": 2982,
    "Name of the Faculty": "Dr.C.Sreevardhan",
    Designation: "Addl.Controller of Examination",
    Mobile: 9885937618,
    "mail ID": "sreevardhancheerla@kluniversity.in",
    "Room No": "L409",
    "Cabin No": "L409",
  },
  {
    "S.No.": 29,
    "Emp ID": 2993,
    "Name of the Faculty": "Dr.B.Suresh",
    Designation: "Associate Professor",
    Mobile: 9849128792,
    "mail ID": "sureshbadugu@kluniversity.in",
    "Room No": "R501",
    "Cabin No": "5A13",
  },
  {
    "S.No.": 30,
    "Emp ID": 3661,
    "Name of the Faculty": "Dr.D.Sreenivasa Rao",
    Designation: "Associate Professor",
    Mobile: 9908959608,
    "mail ID": "sreenuece@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A13",
  },
  {
    "S.No.": 31,
    "Emp ID": 3864,
    "Name of the Faculty": "Dr.China Satyanarayana",
    Designation: "Associate Professor",
    Mobile: 9492821151,
    "mail ID": "gcsatya@kluniversity.in",
    "Room No": "L701",
    "Cabin No": "L701",
  },
  {
    "S.No.": 32,
    "Emp ID": 4173,
    "Name of the Faculty": "Dr.K.Rajesh Babu",
    Designation: "Associate Professor",
    Mobile: 7288890199,
    "mail ID": "krajeshbabu@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3A4",
  },
  {
    "S.No.": 33,
    "Emp ID": 4272,
    "Name of the Faculty": "Dr.G.Sai Krishna Santosh",
    Designation: "Dy.HOD",
    Mobile: 9989721790,
    "mail ID": "gsksantosh17@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3A5",
  },
  {
    "S.No.": 34,
    "Emp ID": 4608,
    "Name of the Faculty": "Dr.Sampad Kumar Panda",
    Designation: "Dy.HOD",
    Mobile: 9757031298,
    "mail ID": "sampadpanda@kluniversity.in",
    "Room No": "R501",
    "Cabin No": "5A18",
  },
  {
    "S.No.": 35,
    "Emp ID": 4695,
    "Name of the Faculty": "Dr.R.S.Ernest Ravindran",
    Designation: "Associate Professor",
    Mobile: 9944423143,
    "mail ID": "ravindran.ernest@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3A10",
  },
  {
    "S.No.": 36,
    "Emp ID": 4773,
    "Name of the Faculty": "Dr.K.Girija Sravani",
    Designation: "Associate Professor",
    Mobile: 7095666645,
    "mail ID": "kondavitee.sravani@kluniversity.in",
    "Room No": "L706",
    "Cabin No": "L706",
  },
  {
    "S.No.": 37,
    "Emp ID": 4958,
    "Name of the Faculty": "Dr.M.Kasi Prasad",
    Designation: "Associate Professor",
    Mobile: 9848520348,
    "mail ID": "mkasiprasad@kluniversity.in",
    "Room No": "R501",
    "Cabin No": "5A10",
  },
  {
    "S.No.": 38,
    "Emp ID": 4966,
    "Name of the Faculty": "Dr.N.Prabakaran",
    Designation: "Associate Professor",
    Mobile: 9994775459,
    "mail ID": "prabakaran@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3A8",
  },
  {
    "S.No.": 39,
    "Emp ID": 5041,
    "Name of the Faculty": "Dr.Vipul Agarwal",
    Designation: "Associate Professor",
    Mobile: 9977705714,
    "mail ID": "agarvipul@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3A12",
  },
  {
    "S.No.": 40,
    "Emp ID": 5129,
    "Name of the Faculty": "Dr.C.S. Preetham Reddy",
    Designation: "Associate Professor",
    Mobile: 9030766557,
    "mail ID": "cspreetham@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1A8",
  },
  {
    "S.No.": 41,
    "Emp ID": 5155,
    "Name of the Faculty": "Dr.Bukya Balaji",
    Designation: "Associate Professor",
    Mobile: 9989148826,
    "mail ID": "balaji@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A18",
  },
  {
    "S.No.": 42,
    "Emp ID": 5251,
    "Name of the Faculty": "Dr.M.Muzammil Parvez",
    Designation: "Associate Professor",
    Mobile: 8185805077,
    "mail ID": "parvez@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A10",
  },
  {
    "S.No.": 43,
    "Emp ID": 5368,
    "Name of the Faculty": "Dr.P.Syam Sundar",
    Designation: "Assoc.Dean-Skilling",
    Mobile: 8885522122,
    "mail ID": "syamsundarp@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3A14",
  },
  {
    "S.No.": 44,
    "Emp ID": 5398,
    "Name of the Faculty": "Dr.R.Revathi",
    Designation: "Associate Professor",
    Mobile: 9494941978,
    "mail ID": "rrevathi@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A12",
  },
  {
    "S.No.": 45,
    "Emp ID": 5439,
    "Name of the Faculty": "Dr.Chella Santhosh",
    Designation: "Associate Professor",
    Mobile: 7288863426,
    "mail ID": "csanthosh@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A15",
  },
  {
    "S.No.": 46,
    "Emp ID": 5891,
    "Name of the Faculty": "Dr.E.Kiran Kumar",
    Designation: "Associate Professor",
    Mobile: 9133466532,
    "mail ID": "kiraneepuri@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1A4",
  },
  {
    "S.No.": 47,
    "Emp ID": 6365,
    "Name of the Faculty": "Dr.Aravindhan Alagarsamy",
    Designation: "Assoc.Dean, Acadamics",
    Mobile: 9946920174,
    "mail ID": "drarvindhan@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A8",
  },
  {
    "S.No.": 48,
    "Emp ID": 8276,
    "Name of the Faculty": "Dr. SR Srither",
    Designation: "Associate Professor",
    Mobile: 9843399570,
    "mail ID": "srither10@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A11",
  },
  {
    "S.No.": 49,
    "Emp ID": 8417,
    "Name of the Faculty": "Dr. Sandip Swarnakar",
    Designation: "Associate Professor",
    Mobile: 9045137227,
    "mail ID": "sswarnakar@kluniversity.in",
    "Room No": "R501",
    "Cabin No": "5A19",
  },
  {
    "S.No.": 50,
    "Emp ID": 3011,
    "Name of the Faculty": "Dr.K.Sony",
    Designation: "Assistant Professor",
    Mobile: 9849106886,
    "mail ID": "sonykarra@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A9",
  },
  {
    "S.No.": 51,
    "Emp ID": 4148,
    "Name of the Faculty": "Mr.P.Srikanth Reddy",
    Designation: "Assitant Professor",
    Mobile: 8466011222,
    "mail ID": "palagani.srikanth@kluniversity.in",
    "Room No": "R106",
    "Cabin No": "R106",
  },
  {
    "S.No.": 52,
    "Emp ID": 4171,
    "Name of the Faculty": "Dr.K.Uday Kiran",
    Designation: "Assoc.Dean-Academic Registration",
    Mobile: 7331108411,
    "mail ID": "uk_ece@kluniversity.in",
    "Room No": "C114B",
    "Cabin No": "C114B",
  },
  {
    "S.No.": 53,
    "Emp ID": 4295,
    "Name of the Faculty": "Dr.A.V.Prabhu",
    Designation: "Associate Professor",
    Mobile: 8185077835,
    "mail ID": "prabu.deva@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A24",
  },
  {
    "S.No.": 54,
    "Emp ID": 4573,
    "Name of the Faculty": "Dr.K.Suresh Kumar",
    Designation: "Assistant Professor",
    Mobile: 9894237318,
    "mail ID": "m.k.sureshkumar@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A21",
  },
  {
    "S.No.": 55,
    "Emp ID": 4822,
    "Name of the Faculty": "Dr.K.V.Sowmya",
    Designation: "Associate Dean- Student Affairs",
    Mobile: 7659895599,
    "mail ID": "sowmyakambhampati@kluniversity.in",
    "Room No": "C413",
    "Cabin No": "C413",
  },
  {
    "S.No.": 56,
    "Emp ID": 5239,
    "Name of the Faculty": "Mr.M.Lakshmana Kumar",
    Designation: "Assoc.Dean-IQAC",
    Mobile: 9000655745,
    "mail ID": "lakshmana.m@kluniversity.in",
    "Room No": "C214B",
    "Cabin No": "C214B",
  },
  {
    "S.No.": 57,
    "Emp ID": 5477,
    "Name of the Faculty": "Dr.S.Vamsee Krishna",
    Designation: "Assistant Professor",
    Mobile: 8985663996,
    "mail ID": "vamseekrishna@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1A4",
  },
  {
    "S.No.": 58,
    "Emp ID": 6224,
    "Name of the Faculty": "Dr.Atul Kumar",
    Designation: "Assitant Professor",
    Mobile: 9708006204,
    "mail ID": "atulkumar@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3A9",
  },
  {
    "S.No.": 59,
    "Emp ID": 6454,
    "Name of the Faculty": "Dr.SK.Hasane Ahammad",
    Designation: "Assoc. Dean, R&D",
    Mobile: 8977646464,
    "mail ID": "drshaikhasane@kluniversity.in",
    "Room No": "L704A",
    "Cabin No": "L704A",
  },
  {
    "S.No.": 60,
    "Emp ID": 7158,
    "Name of the Faculty": "Dr. Debajit Deb",
    Designation: "Assistant Professor",
    Mobile: 9485158291,
    "mail ID": "debajitdeb@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3A3",
  },
  {
    "S.No.": 61,
    "Emp ID": 7233,
    "Name of the Faculty": "Dr. Vasimalla Yesudasu",
    Designation: "Assistant Professor",
    Mobile: 8499852534,
    "mail ID": "vasimalladasu@kluniversity.in",
    "Room No": "R608",
    "Cabin No": "R608",
  },
  {
    "S.No.": 62,
    "Emp ID": 7744,
    "Name of the Faculty": "Mr. M. Ajay Babu",
    Designation: "Assistant Professor",
    Mobile: 9290758533,
    "mail ID": "mababbu@kluniversity.in",
    "Room No": "R005",
    "Cabin No": "R005",
  },
  {
    "S.No.": 63,
    "Emp ID": 7912,
    "Name of the Faculty": "Dr. Nishant Kumar",
    Designation: "Assistant Professor",
    Mobile: 9501227740,
    "mail ID": "nishantkumar@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A19",
  },
  {
    "S.No.": 64,
    "Emp ID": 7956,
    "Name of the Faculty": "Dr. Vyoma Singh",
    Designation: "Assistant Professor",
    Mobile: 9419183770,
    "mail ID": "vsingh@kluniversity.in",
    "Room No": "R102",
    "Cabin No": "1B4",
  },
  {
    "S.No.": 65,
    "Emp ID": 8033,
    "Name of the Faculty": "Dr. Balaji Ramachandran",
    Designation: "Assistant Professor",
    Mobile: 8056650878,
    "mail ID": "rbalaji@kluniversity.in",
    "Room No": "R401",
    "Cabin No": "4A23",
  },
  {
    "S.No.": 66,
    "Emp ID": 8212,
    "Name of the Faculty": "Ms. P. Sivani",
    Designation: "Assistant Professor",
    Mobile: 8790261705,
    "mail ID": "psivani@kluniversity.in",
    "Room No": "R305",
    "Cabin No": "3B4",
  },
  {
    "S.No.": 67,
    "Emp ID": 9528,
    "Name of the Faculty": "Dr. Ashish Kumar",
    Designation: "Assistant Professor",
    Mobile: 8859435354,
    "mail ID": "kmishra.mashish@kluniversity.in",
    "Room No": "R501",
    "Cabin No": "5A18",
  },
  {
    "S.No.": 68,
    "Emp ID": 9535,
    "Name of the Faculty": "Dr.Y.Shanthi Kumar",
    Designation: "Assistant Professor",
    Mobile: 8014545685,
    "mail ID": "yshanthikumar@kluniversity.in",
    "Room No": "R501",
    "Cabin No": "5A18",
  },
  {
    "S.No.": 69,
    "Emp ID": 9539,
    "Name of the Faculty": "Mr. Vivek Battad",
    Designation: "Assistant Professor",
    Mobile: 9027456191,
    "mail ID": "vivekbhatt@kluniversity.in",
    "Room No": "R106",
    "Cabin No": "R106",
  },
];

const formatSpecialTitle = (title) => {
  return title;
};

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Use useMemo to filter the data only when the search query changes
  const filteredFaculty = useMemo(() => {
    if (!searchQuery) {
      return facultyData;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return facultyData.filter((faculty) =>
      faculty["Name of the Faculty"].toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  const getDesignationColor = (designation) => {
    if (designation.includes("Head") || designation.includes("Professor")) {
      return "text-green-300";
    } else if (designation.includes("Associate")) {
      return "text-emerald-300";
    } else {
      return "text-green-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="py-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-400/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-4 animate-pulse">
              {formatSpecialTitle("Faculty")}
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Discover our distinguished ECE faculty members and their expertise
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-300 mx-auto rounded-full"></div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-md group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <input
              type="text"
              placeholder="Search faculty by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full p-4 pl-12 rounded-2xl bg-gray-900/80 backdrop-blur-sm text-white border border-gray-700/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 shadow-xl"
            />
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((faculty, index) => (
              <div
                key={faculty["Emp ID"]}
                className="group relative"
                onMouseEnter={() => setHoveredCard(faculty["Emp ID"])}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Animated background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                {/* Main card */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-400/10">
                  {/* Top accent line */}
                  <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-300 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

                  <div className="p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                          {faculty["Name of the Faculty"]}
                        </h3>
                      </div>
                      <p
                        className={`text-base font-medium ${getDesignationColor(
                          faculty.Designation
                        )} mb-1`}
                      >
                        {faculty.Designation}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-4">
                      {/* Employee ID */}
                      <div className="flex items-center space-x-4 p-3 rounded-xl bg-gray-800/50 border border-gray-700/30 group-hover:border-green-400/30 transition-all duration-300">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Employee ID
                          </p>
                          <p className="text-white font-mono">
                            {faculty["Emp ID"]}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center space-x-4 p-3 rounded-xl bg-gray-800/50 border border-gray-700/30 group-hover:border-green-400/30 transition-all duration-300">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
                          <Mail className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Email
                          </p>
                          <a
                            href={`mailto:${faculty["mail ID"]}`}
                            className="text-white hover:text-green-300 transition-colors duration-200 truncate block font-mono text-sm"
                          >
                            {faculty["mail ID"]}
                          </a>
                        </div>
                      </div>

                      {/* Location Info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/30 group-hover:border-green-400/30 transition-all duration-300">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                              Room
                            </p>
                            <p className="text-white font-mono">
                              {faculty["Room No"] || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/30 group-hover:border-green-400/30 transition-all duration-300">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                              Cabin
                            </p>
                            <p className="text-white font-mono">
                              {faculty["Cabin No"] || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent for hovered card */}
                  {hoveredCard === faculty["Emp ID"] && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-300 animate-pulse"></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="relative">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-400 mb-3">
                  No Faculty Found
                </h3>
                <p className="text-gray-500 text-lg max-w-md mx-auto">
                  Your search didn't match any faculty names. Try adjusting your
                  search terms.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Faculty;
