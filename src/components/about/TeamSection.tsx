import React from 'react';
import TonyProfileImg from '../../../media/TonyProfile.webp';
import BrandonProfileImg from '../../../media/BrandonProfile.webp';
import aboutData from '../../../edit_content/pages/about.yaml';

const defaultTeamMembers = [
    { name: "Tony Smith", role: "Licensed in Virginia, Maryland, and Washington, D.C., and is a certified military relocation professional", bio: "With decades of experience in real estate, Tony brings unmatched expertise and dedication to every transaction.", imageUrl: TonyProfileImg },
    { name: "Brandon Smith", role: "Licensed in Virginia and is a member of the National Association of Realtors and Northern Virginia Association of Realtors.", bio: "Brandon combines modern marketing strategies with traditional values to deliver exceptional results for clients.", imageUrl: BrandonProfileImg },
];

const TeamSection: React.FC = () => {
    const team = (aboutData as any)?.team || {};
    const teamMembers = ((team as any)?.members || []).length > 0 ? (team as any)?.members.map((m: any) => ({ ...m, imageUrl: m.name === 'Tony Smith' ? TonyProfileImg : BrandonProfileImg })) : defaultTeamMembers;
    
    return (
        <section className="py-20 bg-tn-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-tn-black sm:text-4xl">{((team as any)?.sectionLabel || 'Meet the Team')}</h2>
                    <p className="mt-4 text-xl text-tn-gray">
                        {((team as any)?.heading || 'The dedicated professionals guiding our mission.')}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 max-w-3xl mx-auto">
                    {teamMembers.map((member: any) => (
                         <div key={member.name} className="text-center">
                            <img className="mx-auto h-48 w-48 rounded-full object-cover" src={member.imageUrl} alt={member.name} />
                            <h3 className="mt-6 text-xl font-bold text-tn-black">{member.name}</h3>
                            <p className="mt-1 text-tn-gray text-sm max-w-xs mx-auto">{member.role || member.title}</p>
                            {member.bio && <p className="mt-3 text-tn-gray text-xs max-w-xs mx-auto">{member.bio}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
