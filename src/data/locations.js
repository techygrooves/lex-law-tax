/*
 * Uttar Pradesh location pages
 * ----------------------------
 * One object per city. The page builder reads this file and nothing else
 * for the city pages, so a city's wording is changed here rather than in
 * markup.
 *
 * ---------------------------------------------------------------------
 * THE ONE RULE THAT MATTERS MOST
 * ---------------------------------------------------------------------
 * The firm has ONE office, in Lucknow. Only the Lucknow page carries an
 * address or LocalBusiness-style structured data. Every other page
 * carries, prominently and above the fold, a statement that it does not
 * represent a separate office in that city.
 *
 * Nothing on any page may state or imply a local office, a local
 * telephone number, a local map listing, a locally based advocate, a
 * branch, a local client testimonial, or proximity to a particular
 * court building. No court address, authority address or contact detail
 * for any office is stated anywhere in this file.
 *
 * ---------------------------------------------------------------------
 * WHY EACH CITY READS DIFFERENTLY
 * ---------------------------------------------------------------------
 * A set of pages that differ only by a swapped city name is a doorway
 * page. Each city here therefore carries its own region description,
 * its own emphasis for each of the six service areas, its own
 * consultation wording, its own introduction and its own three
 * questions. The differentiators used are geography and the district's
 * general commercial character, both of which are widely documented.
 * No statistic, ranking or case is asserted for any city.
 *
 * ---------------------------------------------------------------------
 * INDEXING
 * ---------------------------------------------------------------------
 * `index: true`  — indexable at launch.
 * `index: false` — rendered with <meta name="robots" content="noindex,follow">
 *                  and a TODO comment in the source, until the page has
 *                  substantial, independently reviewed local content.
 *
 * After editing, run:  node tools/build-pages.js
 * ---------------------------------------------------------------------
 */

window.siteLocations = {
  /* Shown on every city page, above the fold, on every page except
     Lucknow. {{CITY}} is replaced by the city name. */
  serviceAreaStatement:
    "H.R. Legal Associate is based in Lucknow and assists clients with appropriate matters across Uttar Pradesh. This page does not represent a separate office in {{CITY}}.",

  lastReviewed: "2026-08-07",

  cities: [
    /* ============================== TIER 1 ============================== */
    {
      slug: "lucknow",
      name: "Lucknow",
      isOffice: true,
      index: true,
      title: "Legal, Property and Tax Services in Lucknow | H.R. Legal Associate",
      h1: "Legal, Property and Tax Services in Lucknow",
      description:
        "H.R. Legal Associate is a firm of advocates with its office in Lucknow, assisting with civil, criminal, property, corporate and tax matters.",
      region:
        "Lucknow is the capital of Uttar Pradesh and the seat of much of the state's administration. It is also where the Allahabad High Court maintains its Lucknow Bench, alongside the district courts, tribunals and revenue and registration offices that serve the district.",
      lead: "The firm's office is in Lucknow, and this is where instructions are taken and papers are examined.",
      intro: [
        "This is the firm's principal and only office. Consultations are held here, documents are examined here, and matters arising anywhere in Uttar Pradesh are prepared and conducted from here. Clients in Lucknow have the practical advantage of being able to bring originals in person, which matters more than people expect: a great deal of property and tax work turns on documents that are difficult to assess from a photograph.",
        "Because the capital concentrates so much of the state's administrative and appellate machinery, a wide range of matters is dealt with locally — from district court proceedings and registration work through to matters before tribunals and the High Court bench sitting here."
      ],
      emphasis: {
        civil: "Suits, written statements, interim applications and appeals before the civil and criminal courts having jurisdiction in the district, together with execution of decrees.",
        cheque: "Demand notices and complaints under the Negotiable Instruments Act, with the parallel civil claim for the debt run alongside where that is appropriate.",
        property: "Title examination, agreements to sell, sale and gift deeds, registration formalities and mutation, with originals examined in the office before anything is signed.",
        corporate: "Commercial agreements, partnership deeds, employment documentation and ongoing advisory support for businesses operating from the capital.",
        tax: "Income-tax and GST advisory, replies to notices, and representation in assessment and appellate proceedings.",
        registration: "Formation and registration of firms, LLPs and companies, with the governing documents drafted alongside the application rather than after it."
      },
      consultation:
        "Consultations are held at the office. Bringing the original documents to a first meeting makes it considerably more useful, since much of the initial assessment is an examination of the papers themselves.",
      faqs: [
        [
          "Where exactly is the office?",
          "The office is in Lucknow. The address and telephone number are published on the contact page and in the footer of every page of this website. Please make an appointment before attending rather than calling in, so that time can be set aside to look at the papers properly."
        ],
        [
          "Which courts and authorities serve matters arising in Lucknow?",
          "Depending on the subject and value of the matter, it may lie before the district courts, a tribunal, the revenue authorities, the registration office, or the High Court bench that sits in the city. Which forum applies to your matter is confirmed on the facts before anything is filed."
        ],
        [
          "Can I bring documents in without an appointment?",
          "It is better to arrange a time. Documents left without a discussion are of limited use, because the questions that matter usually arise from the papers rather than from a summary of them."
        ]
      ]
    },

    {
      slug: "kanpur",
      name: "Kanpur",
      isOffice: false,
      index: true,
      title: "Legal and Tax Services for Clients in Kanpur, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Kanpur",
      description:
        "Assistance for clients in Kanpur with civil, criminal, recovery, property, corporate and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Kanpur sits on the Ganga in central Uttar Pradesh and has a long-established manufacturing and trading base. That commercial character shapes the kind of instructions the firm receives from the district: a high proportion concern supply arrangements, unpaid invoices and dishonoured cheques rather than personal disputes.",
      lead: "Assistance for individuals and businesses in Kanpur, conducted from the firm's office in Lucknow.",
      intro: [
        "Instructions from Kanpur most often arise out of trade. A consignment supplied and not paid for, a cheque returned unpaid against a running account, a distribution arrangement that was never reduced to writing — these are the matters that recur, and each of them is decided on the documents the parties generated at the time.",
        "That is why the first stage of a Kanpur instruction is usually documentary rather than procedural. Invoices, delivery records, ledgers and the correspondence between the parties are assembled and reconciled before any view is taken on which proceeding to bring and in which forum."
      ],
      emphasis: {
        civil: "Commercial suits and defences, applications for interim relief where goods or assets are at risk, and execution once a decree has been obtained.",
        cheque: "Dishonoured cheques against trade accounts, where the demand notice has to identify the transaction accurately and go out within the period the statute allows.",
        property: "Title examination and documentation for industrial and residential property, and disputes about possession and title in the district.",
        corporate: "Supply, distribution and vendor agreements, drafted so that payment terms and remedies for delay are actually enforceable.",
        tax: "GST questions arising from supply chains and input tax credit, and income-tax notices connected with business receipts.",
        registration: "Registration of firms and companies for traders and manufacturers, with the partnership deed or constitution settled at the same time."
      },
      consultation:
        "A first discussion is usually held by telephone or video, with documents sent ahead so they can be read before the call. Where originals need to be examined — most often in property matters — a visit to the Lucknow office is arranged.",
      faqs: [
        [
          "Do I have to travel to Lucknow to instruct the firm?",
          "Not to begin with. An initial discussion and the review of scanned documents can be done remotely. A visit becomes worthwhile where originals must be examined or a document has to be executed, and that is arranged for a specific purpose rather than as a matter of routine."
        ],
        [
          "Our dispute is with a supplier in another district. Where would it be heard?",
          "That depends on where the cause of action arose, on the value of the claim and on what the contract says about jurisdiction or arbitration. It is settled on the documents before anything is filed, because filing in the wrong forum costs both time and court fee."
        ],
        [
          "We have several cheques from the same party that have bounced. Is that one matter or several?",
          "Each dishonoured cheque generally gives rise to its own cause of action with its own timeline, so they are usually dealt with individually even where they arise from one account. The dates on each return memo are what determine the sequence."
        ]
      ]
    },

    {
      slug: "prayagraj",
      name: "Prayagraj",
      isOffice: false,
      index: true,
      title: "Legal and Tax Services for Clients in Prayagraj, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Prayagraj",
      description:
        "Assistance for clients in Prayagraj with civil, criminal, property and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Prayagraj, in eastern Uttar Pradesh at the confluence of the Ganga and the Yamuna, is the principal seat of the Allahabad High Court. Matters from the district therefore include a higher proportion of appellate and writ work than most, alongside the district court, revenue and registration matters common everywhere.",
      lead: "Assistance for clients in Prayagraj, including appellate matters, conducted from the firm's office in Lucknow.",
      intro: [
        "Instructions connected with Prayagraj frequently concern a stage of a matter rather than its beginning: an order that has gone against a client and may be appealable, a proceeding that has stalled, or a question about whether a writ remedy is available at all. Those are assessed on the order and the record below rather than on a description of what happened.",
        "The practical point in appellate work is timing. Appeal periods are short and run from the date of the order, and material not placed on the record at the earlier stage is admitted later only in limited circumstances. An order is therefore worth sending as soon as it is received, whatever is eventually decided about it."
      ],
      emphasis: {
        civil: "Assessment of orders for appealability, appeals and revisions, and applications connected with stay of a decree or an order pending appeal.",
        cheque: "Complaints and defences under the Negotiable Instruments Act, and appeals from orders passed in such complaints.",
        property: "Title and succession questions, partition, and disputes where an earlier order or decree already forms part of the history.",
        corporate: "Commercial agreements and the documentation businesses in the district need, with disputes assessed for the appropriate forum.",
        tax: "Income-tax and GST appeals, and advice on whether an assessment order is worth contesting on the material available.",
        registration: "Firm, LLP and company registration, with the governing documents drafted to support the application."
      },
      consultation:
        "Where an order has been passed, please send a complete copy at the outset, with the papers filed below. The first assessment is of the record rather than of the account of it, and appeal periods run whether or not advice has been taken.",
      faqs: [
        [
          "I have an order against me. How quickly do I need to act?",
          "Quickly. Appeal and revision periods are prescribed, are generally short, and run from the date of the order or its service. Condonation of delay is not a matter of right. Send the complete order as soon as you have it so the period can be worked out from it."
        ],
        [
          "Can new documents be produced at the appeal stage?",
          "Only in limited circumstances, and it has to be justified. This is the main reason it matters to place material on the record while the original proceeding is still live rather than holding it back."
        ],
        [
          "Is every adverse order worth appealing?",
          "No, and it is worth saying so plainly. Some orders are not realistically contestable on the material available, and pursuing them costs time and money without improving the position. That assessment is made honestly on the record before anything is filed."
        ]
      ]
    },

    {
      slug: "varanasi",
      name: "Varanasi",
      isOffice: false,
      index: true,
      title: "Legal and Tax Services for Clients in Varanasi, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Varanasi",
      description:
        "Assistance for clients in Varanasi with property, succession, civil, small-business and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Varanasi, in eastern Uttar Pradesh, has a long-established trading and handloom economy and a great deal of old, closely held urban property. Both of those shape the instructions that come from the district: family property questions with long histories, and small-business documentation and compliance.",
      lead: "Assistance for clients in Varanasi, particularly on family property and small-business matters, from the firm's Lucknow office.",
      intro: [
        "Property in older parts of a city like Varanasi frequently passes within families over generations without every step being documented. The result is a chain of title with informal links in it — an oral partition, a share never formally released, an heir never brought on the record. Those gaps are not fatal, but they have to be identified before a sale rather than after one.",
        "The other recurring instruction is from small and family-run businesses: a partnership that has been running on an understanding, invoicing without written terms, or a GST question that has produced a notice. The work in both cases starts by reconstructing what the documents actually establish."
      ],
      emphasis: {
        civil: "Title and partition suits, possession matters, and disputes where an old family arrangement is being relied on by one side.",
        cheque: "Recovery of trade dues and dishonoured cheques for small and family-run businesses.",
        property: "Title examination on long chains, succession and partition documentation, sale and gift deeds, and mutation of records afterwards.",
        corporate: "Partnership deeds for family firms, and written terms for businesses that have been trading without them.",
        tax: "GST registration and returns for small businesses, and income-tax questions arising from property sales within a family.",
        registration: "Registration of partnership firms, and advice on whether a firm, LLP or company suits the way the business actually operates."
      },
      consultation:
        "For property matters, the useful first step is to list what documents exist and who holds them, including for the earlier links in the chain. Copies can be sent ahead; originals are examined at the Lucknow office before any transaction proceeds.",
      faqs: [
        [
          "Our family property was divided years ago but nothing was written down. Where does that leave us?",
          "An oral partition is frequently asserted and is hard to prove. What helps is contemporaneous material — who has been in possession of what, who has paid the taxes, and how the revenue or municipal records have been maintained since. Those are examined before any view is taken."
        ],
        [
          "The property has been in the family for generations and some papers are missing. Can it still be sold?",
          "Often, but the gaps have to be identified and dealt with first. Certified copies can usually be obtained from the office where a document was registered, and missing links in the chain can sometimes be established another way. It is far easier to do before a buyer's advocate raises it."
        ],
        [
          "We run a small business without any written agreements. Is that a problem?",
          "It becomes one when a dispute arises or a tax question is raised, because there is nothing to point at. Putting short, clear terms in writing is usually inexpensive and is the single most useful thing a small business can do."
        ]
      ]
    },

    {
      slug: "gorakhpur",
      name: "Gorakhpur",
      isOffice: false,
      index: true,
      title: "Legal and Tax Services for Clients in Gorakhpur, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Gorakhpur",
      description:
        "Assistance for clients in Gorakhpur with land and revenue records, civil matters, recovery and tax questions, conducted from the firm's Lucknow office.",
      region:
        "Gorakhpur is a regional administrative and commercial centre in eastern Uttar Pradesh, close to the border with Nepal, serving a largely agricultural hinterland. Instructions from the district often involve agricultural land and the revenue record, which is a different body of procedure from urban property work.",
      lead: "Assistance for clients in Gorakhpur, including land and revenue-record matters, from the firm's Lucknow office.",
      intro: [
        "Where agricultural land is involved, the relevant record is the revenue record rather than a municipal one, and several questions that would go to a civil court for urban property lie instead before the revenue authorities. Knowing which of the two applies is the first thing to settle, because filing in the wrong forum is a common and expensive mistake in this area.",
        "The second recurring feature is inheritance. Land passing on death to several heirs, with the record updated late or not at all, produces disputes years afterwards when one heir attempts to sell. Getting the record right at the time is far cheaper than litigating it later."
      ],
      emphasis: {
        civil: "Civil suits and defences, and matters where it must first be determined whether the civil court or the revenue authority has jurisdiction.",
        cheque: "Recovery of dues and dishonoured cheques for traders and agricultural businesses in the district.",
        property: "Agricultural and residential land, mutation and correction of revenue entries, succession, and partition among heirs.",
        corporate: "Documentation for traders, commission agents and small businesses, including supply and agency arrangements.",
        tax: "GST and income-tax questions for businesses in the district, and notices arising from agricultural and non-agricultural income.",
        registration: "Registration of firms and companies, with the governing deed drafted to match how the business is actually run."
      },
      consultation:
        "For land matters, the revenue record extract and the documents by which the land was acquired are the starting point. They can be sent ahead of a first discussion, and a visit to the Lucknow office is arranged where originals must be seen.",
      faqs: [
        [
          "Will my land matter go to the civil court or the revenue court?",
          "It depends on the nature of the land and on what is being asked for. Questions about entries in the revenue record generally lie before the revenue authorities, while questions of title and cancellation of instruments generally lie before the civil court. The correct forum is settled on the facts before filing."
        ],
        [
          "The land is still recorded in my grandfather's name. What has to be done?",
          "Mutation on succession, which means establishing who the heirs are and applying to have the record updated. Where several heirs are entitled, all of them are interested persons, and an entry obtained without notice to them is open to challenge later."
        ],
        [
          "Does mutation mean the land is legally mine?",
          "No. Mutation updates the revenue record for fiscal and administrative purposes. It is important, and it should be done, but title comes from the instrument of transfer or the succession behind it, not from the entry."
        ]
      ]
    },

    {
      slug: "bareilly",
      name: "Bareilly",
      isOffice: false,
      index: true,
      title: "Legal and Tax Services for Clients in Bareilly, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Bareilly",
      description:
        "Assistance for clients in Bareilly with property, family, recovery and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Bareilly is the principal city of the Rohilkhand region in northern Uttar Pradesh, serving an agricultural and trading hinterland. Instructions from the district commonly concern land and family property, and the documentation of businesses that have grown from trading concerns.",
      lead: "Assistance for clients in Bareilly on property, family and business matters, from the firm's Lucknow office.",
      intro: [
        "A recurring instruction from this region concerns property held jointly within a family for a long period: cultivated by one branch, recorded in the name of another, and never formally divided. When one party wishes to sell or build, the arrangement is tested for the first time, usually under time pressure.",
        "These are dealt with by establishing what the documents and the record actually show before positions harden. Where the position on the ground is at risk — a sale in progress, construction beginning — interim protection may be needed at once, and that turns on what can be produced immediately rather than in a month."
      ],
      emphasis: {
        civil: "Partition and title suits, possession matters, and applications for injunction where a transfer or construction is under way.",
        cheque: "Dishonoured cheques and recovery of dues arising from trade in the district.",
        property: "Agricultural and residential land, title examination, mutation, partition and family settlements reduced to writing.",
        corporate: "Documentation for trading businesses, including partnership deeds and supply arrangements.",
        tax: "Income-tax questions arising from land sales and family transfers, and GST for trading businesses.",
        registration: "Firm and company registration for businesses formalising an existing trading arrangement."
      },
      consultation:
        "Where property is jointly held, it helps to identify at the outset everyone who may be entitled, not only those currently in possession. Documents can be sent ahead; originals are examined at the Lucknow office.",
      faqs: [
        [
          "One family member is trying to sell property we all have a share in. What can be done?",
          "Where a transfer is under way, the position on the ground may need to be protected quickly, which usually means an application for interim relief alongside the substantive claim. What can be produced immediately matters more than what could be obtained later, so send what you have without waiting."
        ],
        [
          "Does a co-owner need everyone's consent to sell?",
          "A co-owner can generally deal with their own share, but what a purchaser actually receives, and whether possession of a defined portion follows, are separate questions. Where the property has not been partitioned this needs care on both sides of the transaction."
        ],
        [
          "We want to divide family property without going to court. Is that possible?",
          "Yes, by a written family settlement or partition deed properly executed and, where required, registered, with the revenue or municipal record then updated to match. Doing it in writing is what prevents the arrangement being disputed a decade later."
        ]
      ]
    },

    {
      slug: "agra",
      name: "Agra",
      isOffice: false,
      index: true,
      title: "Legal and Tax Services for Clients in Agra, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Agra",
      description:
        "Assistance for clients in Agra with commercial contracts, property, recovery and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Agra lies on the Yamuna in western Uttar Pradesh. Its economy combines a substantial visitor trade with established manufacturing, particularly in leather and footwear, much of it supplying buyers outside the state and outside India.",
      lead: "Assistance for clients in Agra, including businesses supplying outside the state, from the firm's Lucknow office.",
      intro: [
        "Where a business sells beyond its own district, its documentation has to do more work. Terms of supply, when title and risk pass, what happens on rejection, how payment is secured and which forum decides a dispute all matter more when the buyer is at a distance and a personal relationship cannot be relied on to resolve things.",
        "Instructions from Agra therefore often concern the agreements themselves rather than a dispute that has already arisen — which is the better time to take them. Where a dispute has arisen, the same clauses determine what can be done about it."
      ],
      emphasis: {
        civil: "Commercial suits and defences, recovery proceedings, and applications for interim relief where goods or payment are at risk.",
        cheque: "Dishonoured cheques on trade accounts, including where the drawer is outside the district.",
        property: "Title examination and documentation for commercial and residential property, and disputes over possession and title.",
        corporate: "Supply, distribution and agency agreements for businesses selling outside the district, with payment security and dispute resolution addressed properly.",
        tax: "GST on interstate supply and input tax credit questions, and income-tax notices connected with business receipts.",
        registration: "Firm, LLP and company registration for manufacturing and trading businesses, with the constitution drafted alongside."
      },
      consultation:
        "For contract work, send the draft or the existing arrangement and a short note of what has been agreed commercially. Most of the value is in the clauses that decide what happens when something goes wrong, and those are settled before signature.",
      faqs: [
        [
          "Our buyer is in another state and is not paying. Where would a claim be brought?",
          "That depends on where the cause of action arose and on what the contract says about jurisdiction or arbitration. A well-drafted agreement settles this in advance; where there is no agreement, it has to be worked out from the transaction, which is one of the reasons written terms are worth having."
        ],
        [
          "The customer keeps changing the specification after the order. What can we do?",
          "Contractually, by defining scope precisely, stating what is excluded, and providing a change mechanism with a price and time consequence. Where an arrangement is already running, the correspondence recording each change becomes the evidence, so it should be kept and confirmed in writing."
        ],
        [
          "Is a purchase order enough, or do we need a full agreement?",
          "Purchase orders can form a binding contract, but they rarely deal with liability, termination, payment security or dispute resolution. For a recurring relationship, a short master agreement with orders sitting beneath it is usually the better structure."
        ]
      ]
    },

    /* ============================== TIER 2 ==============================
       Structure in place; noindex,follow until each page carries
       substantial, independently reviewed local content.               */

    {
      slug: "ghaziabad",
      name: "Ghaziabad",
      isOffice: false,
      index: false,
      title: "Legal and Tax Services for Clients in Ghaziabad, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Ghaziabad",
      description:
        "Assistance for clients in Ghaziabad with property, employment, commercial and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Ghaziabad lies in western Uttar Pradesh, within the National Capital Region. The district combines dense residential development with industrial and commercial activity, and a substantial part of its property work concerns apartments and developer-built housing rather than independent plots.",
      lead: "Assistance for clients in Ghaziabad on property, employment and commercial matters, from the firm's Lucknow office.",
      intro: [
        "Property work in a district of this kind differs from work on independent plots. A buyer of an apartment is dealing with an allotment or builder-buyer arrangement, a development authority's conditions, and a maintenance and association structure, in addition to the ordinary questions of title. Each of those has to be read before money moves.",
        "The other common instruction is employment documentation, which follows from the concentration of employers in the region. Appointment letters, confidentiality obligations and exit terms are the documents that get tested, and they are worth drafting for the position in India rather than adapting from a foreign template."
      ],
      emphasis: {
        civil: "Civil suits and defences, recovery proceedings and applications for interim relief.",
        cheque: "Dishonoured cheques on commercial and rental accounts.",
        property: "Apartment and allotment-based purchases, builder documentation, title examination and registration, and disputes over possession.",
        corporate: "Employment agreements and workplace documentation, and commercial contracts for businesses in the district.",
        tax: "GST for service and trading businesses, and income-tax questions arising from property transactions.",
        registration: "Company, LLP and firm registration, with the constitutional documents drafted alongside."
      },
      consultation:
        "For an apartment purchase, the allotment or builder agreement and the approvals for the project are the documents to send first. Copies can be reviewed remotely; originals are examined at the Lucknow office before completion.",
      faqs: [
        [
          "I am buying an apartment from a developer. What should be checked?",
          "The developer's title to the land, the approvals for the project, the terms of the agreement being offered, the position on any registration required for the project, and what is being promised about possession and common areas. The agreement is drafted in the developer's interest, which is normal, and is worth reading independently."
        ],
        [
          "Can an employer stop me joining a competitor after I leave?",
          "A broad restraint operating after employment ends is treated restrictively under Indian contract law and is difficult to enforce. Confidentiality and reasonable non-solicitation obligations stand differently. What your particular agreement does is a question of what it actually says."
        ],
        [
          "The builder is delaying possession. What are the options?",
          "It depends on the agreement, on what was promised and on which statutory framework applies to the project. The agreement and the approvals are the starting point, and the correspondence recording each delay matters, so it should be preserved."
        ]
      ]
    },

    {
      slug: "meerut",
      name: "Meerut",
      isOffice: false,
      index: false,
      title: "Legal and Tax Services for Clients in Meerut, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Meerut",
      description:
        "Assistance for clients in Meerut with commercial documentation, property, recovery and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Meerut is a long-established commercial and manufacturing city in western Uttar Pradesh, within the National Capital Region. Its business base includes light engineering and sports goods manufacture, much of it in small and medium-sized units supplying buyers elsewhere.",
      lead: "Assistance for clients in Meerut, particularly small and medium businesses, from the firm's Lucknow office.",
      intro: [
        "Smaller manufacturing units carry a particular exposure: they extend credit to buyers considerably larger than themselves, on terms that are frequently unwritten. When payment stops, there is often nothing beyond invoices and a delivery record to establish what was agreed.",
        "The work therefore divides between putting proper terms in place for the future and reconstructing, from what exists, a claim that can actually be brought. Both start with the same exercise of reconciling the account to documents."
      ],
      emphasis: {
        civil: "Recovery suits and defences, and applications for interim relief where assets are at risk.",
        cheque: "Dishonoured cheques against trade accounts, with the civil claim for the debt pursued alongside where appropriate.",
        property: "Title examination and documentation for industrial and residential property, and possession disputes.",
        corporate: "Supply and job-work agreements, payment terms and security, and documentation for units supplying larger buyers.",
        tax: "GST reconciliation and input tax credit questions, and income-tax matters for manufacturing units.",
        registration: "Firm and company registration, and Udyam registration where the statutory payment protections matter."
      },
      consultation:
        "For a recovery matter, the ledger, the invoices and the bank statements are what the claim will be built on. Sending them ahead makes the first discussion far more useful than a description of the amount owed.",
      faqs: [
        [
          "Our buyer is much larger than us and simply does not pay on time. Is there anything beyond a suit?",
          "There are statutory provisions concerning payment to enterprises of certain descriptions, and registration as such an enterprise is one reason small suppliers obtain it. How they apply to a particular supply depends on the facts and on the current provisions, and it is assessed before anything is filed."
        ],
        [
          "We supply on job work with no written agreement. What should we have?",
          "At minimum: what is being made, to what specification, who supplies the materials, who bears loss or rejection, when payment falls due, and what happens if it does not come. A short written agreement covering those is usually enough and is far cheaper than one dispute."
        ],
        [
          "How far back can unpaid invoices be recovered?",
          "Limitation for most money claims is generally three years, but the date it runs from, and the effect of any written acknowledgement or part payment, depend on the facts. The position should be worked out on your ledger before a claim is prepared."
        ]
      ]
    },

    {
      slug: "aligarh",
      name: "Aligarh",
      isOffice: false,
      index: false,
      title: "Legal and Tax Services for Clients in Aligarh, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Aligarh",
      description:
        "Assistance for clients in Aligarh with business documentation, recovery, property and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Aligarh, in western Uttar Pradesh, has a manufacturing base long associated with locks and builders' hardware, largely organised in small units supplying wholesalers and distributors across the country.",
      lead: "Assistance for clients in Aligarh, particularly small manufacturing units, from the firm's Lucknow office.",
      intro: [
        "Where a manufacturing base is organised around many small units selling through distributors, the recurring legal questions concern the distribution relationship itself: territory, minimum offtake, credit, returns of unsold stock, and what happens when either side wants out.",
        "These are questions a written arrangement answers cheaply and an unwritten one answers expensively. Where a relationship has already broken down, the same points are argued from invoices and correspondence instead."
      ],
      emphasis: {
        civil: "Recovery suits and defences, and disputes arising out of distribution and agency arrangements.",
        cheque: "Dishonoured cheques from distributors and wholesalers, with the demand notice issued within the statutory period.",
        property: "Title examination and documentation for industrial and residential property in the district.",
        corporate: "Distribution, agency and supply agreements, with credit terms, returns and termination dealt with properly.",
        tax: "GST on outward supply and input tax credit, and income-tax matters for manufacturing units.",
        registration: "Firm and company registration, and Udyam registration for units that need it."
      },
      consultation:
        "For a distribution dispute, the arrangement as it actually operates matters as much as any document: how orders were placed, how credit was extended, and what was said about returns. Send the correspondence along with the invoices.",
      faqs: [
        [
          "Our distributor is holding stock and not paying. What can be done?",
          "It depends on whether the goods were sold to the distributor or supplied on consignment, which is exactly the point unwritten arrangements leave unclear. The invoices, the delivery documents and the correspondence are examined to establish which it was before a claim is framed."
        ],
        [
          "Can we appoint a distributor for a territory and prevent them selling elsewhere?",
          "Territorial arrangements are common in distribution agreements, but restraints have limits under Indian contract law and the clause has to be drafted with that in mind. What is workable depends on how the restriction is framed."
        ],
        [
          "We have no written agreement with our distributor of ten years. Should we put one in place now?",
          "Usually yes, and it can be done without disturbing the relationship by recording what already happens rather than changing it. The value shows up when the relationship ends, which is when unwritten arrangements are most expensive."
        ]
      ]
    },

    {
      slug: "moradabad",
      name: "Moradabad",
      isOffice: false,
      index: false,
      title: "Legal and Tax Services for Clients in Moradabad, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Moradabad",
      description:
        "Assistance for clients in Moradabad with export documentation, GST, recovery and property matters, conducted from the firm's Lucknow office.",
      region:
        "Moradabad, in western Uttar Pradesh, has a long-established metalware and handicraft industry, a substantial part of which supplies buyers outside India through exporters and buying houses.",
      lead: "Assistance for clients in Moradabad, including businesses supplying export buyers, from the firm's Lucknow office.",
      intro: [
        "Where a unit supplies through an exporter or a buying house rather than directly, the contractual chain matters. Who bears the risk of rejection, at what point the sale is complete, how payment is secured and what happens if the overseas buyer does not take delivery are all questions that arise between the unit and the intermediary, not with the overseas buyer at all.",
        "Alongside that, businesses in the district raise the tax questions that follow from supplying goods that eventually leave the country, and from the credit position on inputs. Both are dealt with on the documents rather than on the general position."
      ],
      emphasis: {
        civil: "Recovery suits and defences, and disputes with intermediaries over rejected or unpaid consignments.",
        cheque: "Dishonoured cheques on trade accounts, pursued alongside the civil claim where appropriate.",
        property: "Title examination and documentation for industrial and residential property in the district.",
        corporate: "Supply agreements with exporters and buying houses, dealing with rejection, payment security and termination.",
        tax: "GST questions arising from supply to exporters, input tax credit and departmental notices.",
        registration: "Firm and company registration, and Udyam registration where it is relevant to the business."
      },
      consultation:
        "For a supply dispute, the purchase order, the specification, the inspection or rejection record and the correspondence are the documents that decide it. They can be reviewed remotely before a first discussion.",
      faqs: [
        [
          "The buying house rejected a consignment after taking delivery. Where do we stand?",
          "It depends on what the arrangement said about inspection and acceptance, and on when title and risk were to pass. Where nothing was agreed in writing, the conduct of the parties and the correspondence become the evidence, which is why those records matter."
        ],
        [
          "Do we need a written agreement if we have been supplying the same exporter for years?",
          "It is worth having. Long relationships are precisely where terms are assumed rather than agreed, and the assumptions diverge at the point they are tested. A short agreement recording what already happens is usually enough."
        ],
        [
          "Our input tax credit has been questioned. What is needed to defend it?",
          "The invoice, the agreement, evidence that the supply was actually received and proof of payment to the supplier. The strength of the position depends on what can be produced, and on the period and the provisions then in force."
        ]
      ]
    },

    {
      slug: "saharanpur",
      name: "Saharanpur",
      isOffice: false,
      index: false,
      title: "Legal and Tax Services for Clients in Saharanpur, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Saharanpur",
      description:
        "Assistance for clients in Saharanpur with business documentation, property, recovery and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Saharanpur lies in the north-west of Uttar Pradesh, near the boundaries with Uttarakhand and Haryana. The district has an agricultural hinterland and a craft manufacturing base long associated with woodwork, much of it in small family-run units.",
      lead: "Assistance for clients in Saharanpur on business, land and recovery matters, from the firm's Lucknow office.",
      intro: [
        "A district on a state boundary raises questions that inland districts do not. Where a supplier and a buyer are in different states, which forum decides a dispute, and how a supply is treated for tax, both depend on facts that are easy to get wrong when the distance involved is short.",
        "Alongside that, the district's family-run manufacturing units raise the ordinary questions of an undocumented business: what the partners actually agreed, what the terms of supply are, and how an exit would work."
      ],
      emphasis: {
        civil: "Recovery suits and defences, and disputes where the parties are in different states.",
        cheque: "Dishonoured cheques on trade accounts, with jurisdiction confirmed from the deposit records before filing.",
        property: "Agricultural and residential land, title examination, mutation and partition among heirs.",
        corporate: "Partnership deeds for family-run units, and supply agreements with buyers in and outside the state.",
        tax: "GST on interstate supply and registration questions, and income-tax matters for small businesses.",
        registration: "Registration of partnership firms and companies, with the deed drafted to support the application."
      },
      consultation:
        "Where the other party is in a different state, mention that at the outset. It affects both where a claim can be brought and how a supply is treated, and it is easier to plan for than to correct.",
      faqs: [
        [
          "Our buyer is just across the state boundary. Does that change anything?",
          "It can, both for where a dispute would be heard and for how the supply is treated under GST. Neither depends on the distance involved, and both are worth confirming rather than assuming."
        ],
        [
          "Our family business has no partnership deed. What are we relying on?",
          "On the default provisions of the Partnership Act, which govern where the partners have not agreed otherwise. They may not reflect what the family actually intends, particularly on what happens when a partner retires or dies."
        ],
        [
          "Land has been in the family for generations with entries never updated. Is that a problem?",
          "It becomes one at the point of sale or succession, when the persons entitled have to be identified and the record brought up to date. Doing it while the people who know the history are available is considerably easier."
        ]
      ]
    },

    {
      slug: "noida",
      name: "Noida",
      isOffice: false,
      index: false,
      title: "Legal and Tax Services for Clients in Noida, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Noida",
      description:
        "Assistance for clients in Noida with employment, commercial contracts, property and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Noida, in Gautam Buddha Nagar district of western Uttar Pradesh, is a planned township within the National Capital Region. Its base is weighted towards services, technology and organised manufacturing, and its property market towards allotment-based plots and developer-built housing.",
      lead: "Assistance for clients in Noida on employment, commercial and property matters, from the firm's Lucknow office.",
      intro: [
        "Two things recur in instructions from this district. The first is employment documentation — appointment letters, confidentiality and intellectual property clauses, notice periods and exit terms — where documents adapted from foreign precedents frequently contain restraints that are not enforceable in India.",
        "The second is property in an allotment-based system. A plot or apartment held under an authority allotment carries conditions on transfer, dues and permissions that sit alongside the ordinary questions of title, and a transfer that overlooks them creates difficulty for the buyer rather than the seller."
      ],
      emphasis: {
        civil: "Civil suits and defences, recovery proceedings and applications for interim relief.",
        cheque: "Dishonoured cheques on commercial, service and rental accounts.",
        property: "Allotment-based plots and apartments, authority conditions and permissions, title examination, registration and transfer.",
        corporate: "Employment agreements and workplace policies drafted for the position in India, and service and vendor contracts.",
        tax: "GST for service businesses, and income-tax questions arising from property transactions and business receipts.",
        registration: "Company and LLP registration, with constitutional documents and founder arrangements drafted alongside."
      },
      consultation:
        "For property held under an allotment, send the allotment letter and any transfer permission or dues position along with the title documents. Those conditions frequently determine what is actually possible.",
      faqs: [
        [
          "Our employment agreements came from our parent company abroad. Is that a problem?",
          "Often. Post-employment non-compete restraints that are ordinary in some jurisdictions are treated restrictively under Indian contract law and are difficult to enforce here. The confidentiality and non-solicitation provisions usually need reframing rather than replacing."
        ],
        [
          "I am buying a property held under an authority allotment. What is different?",
          "The allotment conditions apply in addition to the ordinary questions of title: whether transfer is permitted, what permissions are needed, and whether dues are outstanding. Those are checked before any substantial payment, because they can prevent completion."
        ],
        [
          "We engage people as consultants rather than employees. Is that safe?",
          "Whether a relationship is one of employment is decided by its substance rather than by the label used. If the arrangement operates as employment, the obligations that attach to employment are likely to follow, so the documentation and the actual practice should match."
        ]
      ]
    },

    {
      slug: "firozabad",
      name: "Firozabad",
      isOffice: false,
      index: false,
      title: "Legal and Tax Services for Clients in Firozabad, Uttar Pradesh | H.R. Legal Associate",
      h1: "Legal and Tax Assistance for Clients in Firozabad",
      description:
        "Assistance for clients in Firozabad with business documentation, recovery, property and tax matters, conducted from the firm's Lucknow office.",
      region:
        "Firozabad lies in western Uttar Pradesh, close to Agra. The district's manufacturing is long associated with glassware and bangles, organised largely in small units supplying traders and wholesalers in other states.",
      lead: "Assistance for clients in Firozabad, particularly small manufacturing units, from the firm's Lucknow office.",
      intro: [
        "Units supplying fragile goods to distant buyers face a specific documentary problem: establishing the condition in which goods left and the point at which risk passed. Where that is not dealt with in the terms of supply, a claim for breakage becomes a dispute about who should bear a loss neither party can now prove.",
        "The other recurring instruction concerns the units themselves — partnerships operating without a deed, or businesses that have outgrown the form they were started in. Both are dealt with by documenting what the arrangement actually is before it is tested."
      ],
      emphasis: {
        civil: "Recovery suits and defences, and disputes about rejected, damaged or unpaid consignments.",
        cheque: "Dishonoured cheques from traders and wholesalers, with the civil claim run alongside where appropriate.",
        property: "Title examination and documentation for industrial and residential property in the district.",
        corporate: "Supply agreements dealing with packing, transit risk, inspection and payment, and partnership documentation for family units.",
        tax: "GST on outward supply and input tax credit questions, and income-tax matters for small manufacturing units.",
        registration: "Firm and company registration, and Udyam registration where it is relevant."
      },
      consultation:
        "For a supply dispute, the terms of supply, the packing and transport records and any inspection report are the documents that decide it. Send those with the invoices ahead of a first discussion.",
      faqs: [
        [
          "A consignment arrived damaged and the buyer refuses to pay. Who bears the loss?",
          "It depends on the terms of supply and on when risk was to pass, which is exactly what unwritten arrangements leave open. The transport documents, the packing record and the correspondence at the time are what the question is decided on."
        ],
        [
          "Should transit risk be dealt with in our supply terms?",
          "Yes, and it is one of the clauses most worth including for goods of this kind: who arranges transport, who insures, at what point risk passes, and what has to be done to make a claim. It costs little to agree in advance and a great deal to argue afterwards."
        ],
        [
          "Our unit has grown and we are still a partnership. Should we change?",
          "Possibly. The choice between a firm, an LLP and a company turns on liability, compliance and whether outside investment is contemplated. It is easier to choose deliberately than to restructure later, and the tax position should be considered alongside the legal one."
        ]
      ]
    }
  ]
};
