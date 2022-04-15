const DoctorDetails = require('./api/models/doctorDetails');
const User = require('./api/models/user');
const bcrypt = require('jsonwebtoken');
const { Role } = require('./api/helpers/constants');
const DoctorData = [
	{
		img: 'https://i.imgur.com/Al8YdLM.jpg',
		category: 'Medicine, Diabetes, Thyroid & Hormone',
		label: 'Dr. Md. Firoj Hossain',
		education:
			'MBBS, FCPS (Medicine), DEM (BIRDEM), MD (Endocrinology), MACE (USA), MACP (USA) ',
		designation: 'Assistant Professor',
		department: 'Department of Endocrinology',
		hospital: 'Mugda Medical College & Hospital',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/eURUI0b.jpg',
		category: 'Diet & Nutrition Consultant',
		label: 'Ms. Jayoti Mukherjee',
		education:
			'B.Sc & M.Sc in Nutrition Science (DU), Trained in BIRDEM, 10+ Years Experience in Weight Management',
		designation: 'Senior Nutrition Consultant',
		department: 'Surecell Medical BD',
		hospital: 'Ex- VLCC Healthcare & VIBES Healthcare',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/RlfZMBR.jpg',
		category: 'Medicine & Chest Specialist (Pulmonologist)',
		label: 'Dr. Rajib Kumar Saha',
		education: 'MBBS(Dhaka), MRCP(UK), MCPS(Medicine), MD(Chest), MACP (USA)',
		designation: 'Consultant',
		department: 'Department of Respiratory Medicine',
		hospital: 'ASGAR ALI HOSPITAL',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/n0yum0a.jpg',
		category: 'Neonate & Child Specialist',
		label: 'Dr. Salahuddin Mahmud',
		education:
			'Fellow in Pediatric Nutrition, Boston University (USA), MBBS (Dhaka), MD (Pediatrics), Fellow in Pediatric Nutrition, Boston University (USA), MBBS (Dhaka), MD (Pediatrics) & Sanjay Gandhi Postgraduate Institute, Lucknow (India)',
		designation: 'Associate Professor',
		department: 'Department of Pediatric  Gastroenterology ',
		hospital: 'Dhaka Shishu (Children) Hospital',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/VP1xMDg.jpg',
		category: 'Dermatologist (Skin, Allergy, Hair, Sex)',
		label: 'Dr. Humaira Afreen',
		education: 'MBBS (DMC), BCS (Health), FCPS (Dermatology and Venereology)',
		designation: 'Assistant Professor',
		department: 'Skin & VD Department',
		hospital: 'SSMC Mitford Hospital, Dhaka',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/E7VjZxG.jpg',
		category: 'Ears, Nose and Throat (ENT) Specialist',
		label: 'Dr. Rashedul Hasan',
		education:
			'MBBS, MSc (London), Specialty: Vertigo, Tinnitus, Hearing loss & ENT disease',
		designation: 'Consultant',
		department: 'Department of Ears, Nose and Throat',
		hospital: 'Prescription Point, Banani ',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/KX5Csjv.jpg',
		category: 'Gynaecologist',
		label: 'Dr. Riffat Rahim',
		education:
			'MBBS (Dhaka), BCS (Health), DGO, FCPS (Gynae & Obs), MMED (BSMMU), Special Training of Laparoscopic Surgery (Chennai, India)',
		designation: 'Assistant Professor',
		department: 'Department of Gynae & Obs',
		hospital: 'Mugda Medical College, Dhaka',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/a9HMk43.jpg',
		category: 'Neurologist',
		label: 'PROF. DR. Mohd. Mozibor',
		education:
			'MBBS, FCPS(Medicine), FRCP(UK), FACP(USA) Advance Training in Neurophysiology (TURKEY)',
		designation: 'Consultant',
		department: 'Neurology Department',
		hospital: 'United Hospital Ltd., Gulshan 2',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/B63wRTP.png',
		category: 'Dentist',
		label: 'Dr. Shahana Dastagir',
		education:
			'BDS (Dhaka Dental College), PGT (Netherlands), MPH (USA), MPhil',
		designation: 'Associate Professor',
		department: 'Department of Dentistry',
		hospital: 'BIRDEM Hospital & Ibrahim Medical College',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/X9ehOrA.jpg',
		category: 'Orthopaedic Surgeon',
		label: 'Dr. Asadullah Ripon',
		education:
			'MBBS, D. Ortho in Orthopaedic Surgery, Specialised Training in Hand Surgery (India, UK)',
		designation: 'Associate Professor',
		department: 'Department of Orthopedics',
		hospital: 'Enam Medical College and Hospital',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/n8SzXfM.jpg',
		category: 'Nephrologist',
		label: 'Dr. Shudhanshu Kumar',
		education:
			'MBBS, MD (Nephrology), Advance Training in Neurophysiology (India)',
		designation: 'Registrar',
		department: 'Department of Nephrology & Dialysis',
		hospital: 'BIRDEM Hospital & Ibrahim Medical College',
		rating: 4,
	},
	{
		img: 'https://i.imgur.com/ZJt3sxW.jpg',
		category: 'General and Colorectal Surgeon',
		label: 'Dr. Nazmul Hoque Masum',
		education:
			'MBBS (DMC), FCPS (Surgery) FICS, FACS (USA) Fellow, International Society of University Colon and Rectal Surgeons (FISUCRS) Member, American Society of Colon and Rectal Surgeons(ASCRS) Fellow, Minimal Access Surgery (FMAS), India',
		designation: 'Associate Professor',
		department: 'Department of Surgery',
		hospital: 'Dhaka Medical College & Hospital',
		rating: 4,
	},
];

async function generate() {
	const genericPassword = 'a';
	for (const doctor of DoctorData) {
		try {
			const detail = await DoctorDetails.findOne({ img: doctor.img });
			if (detail) {
				console.error('you already filled the database');
				break;
			}
			const details = await DoctorDetails.create(doctor);
			const [_, firstName, lastName] = doctor.label.split(' ');
			const data = {
				details: details.id,
				firstName,
				lastName,
				role: Role.DOCTOR,
				email: firstName.toLocaleLowerCase() + '@gmail.com',
				password: genericPassword,
			};
			const user = new User(data);

			const salt = 10;
			const hashedpassword = await bcrypt.hash(genericPassword, salt);
			user.password = hashedpassword;
			await user.save();
		} catch (error) {
			console.log(error);
		}
	}
}

generate();
