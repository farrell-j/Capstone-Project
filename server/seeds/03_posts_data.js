/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      SATCAT_id: '25544', 
      post_text: 'International Space Station, it was launched on November 20th, 1998 from Tyuratam, Kazakhstan.', 
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '25533', 
      post_text: 'Called Sputnik 41, it is an amateur radio satellite launched on October 25th, 1998 to commemorate the 41st aniversary of Sputnik 1.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '44713', 
      post_text: 'Starlink-1007, it is part of the Starlink constellation operated by SpaceX. It was launched on November 11th, 2019 from Cape Canaveral, USA.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '44914', 
      post_text: 'Starlink-1008, it is part of the Starlink constellation operated by SpaceX. It was launched on November 11th, 2019 from Cape Canaveral, USA.', 
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '49141', 
      post_text: 'Starlink-3093, it is part of the Starlink constellation operated by SpaceX. It was launched on September 14th, 2021 from Vandenberg, USA.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '53087', 
      post_text: 'Starlink-4329, it is part of the Starlink constellation operated by SpaceX. It was launched on July 11th, 2022 from Vandenberg, USA.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '54869', 
      post_text: 'Starlink-5409, it is part of the Starlink constellation operated by SpaceX. It was launched on December 28th, 2022 from Cape Canaveral, USA.', 
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '55269', 
      post_text: 'Starlink-5277, it is part of the Starlink constellation operated by SpaceX. It was launched on January 19th, 2023 from Vandenberg, USA.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '56358', 
      post_text: 'Starlink-5482, it is part of the Starlink constellation operated by SpaceX. It was launched on April 27th, 2023 from Vandenberg, USA.', 
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '57300', 
      post_text: 'Starlink-30236, it is part of the Starlink constellation operated by SpaceX. It was launched on July 10th, 2023 from Cape Canaveral, USA.', 
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '24907', 
      post_text: 'IRIDIUM 22, it is part of the Iridium communications satellite constellation. It was launched on August 21st, 1997 from Vandenberg, USA.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '43013', 
      post_text: 'NOAA 20, it is a weather satellite managed by the US NOAA. It was launched on November 18th, 2017 from Vandenberg, USA.', 
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '43226', 
      post_text: 'GOES 17, it is an environmental satellite managed by the US NOAA. It was launched on March 1st, 2018 from Cape Canaveral, USA.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '57166', 
      post_text: 'METEOR M2-3, it is a weather imaging satellite managed by Russia. It was launched on June 27th, 2023 from Vostochny, Russia.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '48859', 
      post_text: 'Called NAVSTAR 81, it is part of the US Global Positioning System. It was launched on June 17th, 2021. It was launched from Vandenberg, USA.' , 
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '43567', 
      post_text: 'Called GSAT0220(GALILEO 24), it is a part of the Galileo satellite navigation system operated by the European Union. It was launched on July 25th, 2018 from Kourou in French Guiana.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '42939', 
      post_text: 'Called COSMOS 2522(GLONASS-M). it is a part of the GLONASS satellite navigation system operated by Russia. It was launched on September 22nd, 2017 from Plesetsk, Russia.',
      up_votes: 0,
      down_votes: 0,
    },
    {
      SATCAT_id: '56564', 
      post_text: 'BEIDOU-3 G4 it is a part of the Beidou satellite navigation system operated by China. It was launched on May 17th, 2023 from Xichang, China.', 
      up_votes: 0,
      down_votes: 0,
    },
    ]);
};
