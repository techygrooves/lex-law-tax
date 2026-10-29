/*
 * Long-form articles that sit under a section hub
 * -----------------------------------------------
 * Each entry becomes a page at /<hub>/<slug>/ and a card on the hub.
 * The page is built by articlePage() in tools/build-pages.js, through the
 * same page() shell as every other page, so layout and typography are the
 * site's and nothing here styles itself.
 *
 * Shape of an article:
 *
 *   slug, navLabel        the folder, and the heading on the hub card
 *   name, h1, title       the page heading and the <title>
 *   description, lead     meta description, and the lead under the H1
 *   datePublished/Modified  ISO dates, used in the Article schema
 *   sections[]            { id, heading, paras[], list[]?, table{}?, after[]? }
 *   faqs[]                [question, answer] pairs, rendered and marked up
 *   related[]             [label, href] links shown at the foot
 *
 * A table is { caption, head: [...], rows: [[...]] }. The first cell of
 * each row is rendered as a row header, so the first column should be the
 * thing being compared.
 *
 * ---------------------------------------------------------------------
 * ON CONTENT
 * ---------------------------------------------------------------------
 * These articles name provisions, procedures and decided cases, because
 * the subjects cannot be explained usefully without them. That is a
 * departure from the practice-area pages, which deliberately name none,
 * and the disclaimer page describes the difference. Anything stated here
 * is general explanation of how a procedure works, never advice on a
 * particular matter and never a prediction of an outcome.
 *
 * Figures, forms and timelines change. Each article says where its
 * position comes from so a reader can check it, and the firm should
 * re-read these pages when the Code or the Rules are amended.
 *
 * After editing, run:  node tools/build-pages.js
 * ---------------------------------------------------------------------
 */

window.sectionArticles = [
  {
    hub: "property-law-and-registration",
    articles: [

      /* ============================================================ */
      {
        slug: "agricultural-land-dispute-lawyer-lucknow",
        navLabel: "Agricultural Land Disputes",
        name: "Agricultural Land Dispute Lawyer in Lucknow",
        h1: "Agricultural Land Dispute Lawyer in Lucknow",
        title: "Agricultural Land Dispute Lawyer in Lucknow | Revenue Court Guidance",
        description:
          "Agricultural land disputes in Lucknow: bhumidhari and asami rights under the UP Revenue Code 2006, which forum hears what, record entries, possession and the remedies that actually work.",
        lead:
          "How agricultural land disputes in Uttar Pradesh are decided, which forum hears them, and why the revenue record is the centre of almost every one of them.",
        datePublished: "2026-10-29",
        dateModified: "2026-10-29",
        sections: [
          {
            id: "framework",
            heading: "The law that governs agricultural land in Uttar Pradesh",
            paras: [
              "Agricultural land in Uttar Pradesh is governed by the <strong>Uttar Pradesh Revenue Code, 2006</strong>, which came into force in 2016 and replaced the Zamindari Abolition and Land Reforms Act, 1950 along with a tangle of older statutes. Almost everything that matters in an agricultural land dispute &mdash; who holds the land, what class of right they hold it in, what the record says, who may transfer it and which officer decides a quarrel about it &mdash; comes out of that Code and the Uttar Pradesh Revenue Code Rules, 2016 made under it.",
              "This matters more than it sounds, because agricultural land does not behave like a flat in Gomti Nagar. A civil court that would happily decide a dispute about a house is barred from deciding many questions about agricultural land, which are reserved to revenue courts. Filing in the wrong forum does not merely waste the court fee; it can cost years, and a decree from a court without jurisdiction is worth nothing.",
              "The second thing to understand is that the revenue record is not a formality. The khatauni is the working document of rural landholding. It decides who the state deals with, who can mortgage the land to a bank, whose consent a buyer needs and who the tehsil treats as being in possession. A great many disputes that look like disputes about ownership are, in practice, fights about what the record says."
            ]
          },
          {
            id: "tenure",
            heading: "Classes of tenure: bhumidhar and asami",
            paras: [
              "The Code does not recognise a single undifferentiated owner of agricultural land. It separates holders into classes, and the class decides what a person can do with the land. A <strong>bhumidhar with transferable rights</strong> holds the nearest thing to ownership the Code provides: the holding can be sold, mortgaged, gifted and inherited, subject to the restrictions the Code imposes. A <strong>bhumidhar with non-transferable rights</strong>, dealt with in Section 76, holds the land and may cultivate it and pass it on by succession, but cannot transfer it freely. An <strong>asami</strong>, defined in Section 78, holds on a far weaker footing, often for a limited period or for a limited purpose.",
              "Those categories are not academic. A sale deed executed by someone who was only a bhumidhar with non-transferable rights does not do what the buyer thinks it does. A good proportion of the agricultural land litigation that reaches the Allahabad High Court begins with exactly that mistake, discovered years later when the buyer applies for mutation and the tehsil refuses it.",
              "Section 77 sets out the lands on which bhumidhari rights do not accrue at all, and the interaction between Sections 76, 77 and 78 is where a great deal of the argument happens. In a 2024 decision, the Allahabad High Court read Section 76(dd) with Section 77 and held that an asami is entitled to be recorded as a bhumidhar where the land is not covered by Section 77, and directed the authorities to correct the record accordingly. The Code has also been amended recently: an ordinance in April 2026, later replaced by the Uttar Pradesh Revenue Code (Second Amendment) Act, 2026 with retrospective effect from 8 April 2026, inserted further clauses into Section 76(1) covering certain holders in Pilibhit, Lakhimpur Kheri, Rampur and Bijnor."
            ],
            table: {
              caption: "Classes of holder and what each can do",
              head: ["Class", "Principal source", "Transfer", "Typical dispute"],
              rows: [
                [
                  "Bhumidhar with transferable rights",
                  "UP Revenue Code, 2006",
                  "May sell, gift and mortgage, subject to statutory restrictions",
                  "Title, partition, boundary and sale-deed disputes"
                ],
                [
                  "Bhumidhar with non-transferable rights",
                  "Section 76",
                  "Not freely transferable; succession operates",
                  "Claims to be recorded as transferable; void transfers"
                ],
                [
                  "Asami",
                  "Section 78",
                  "Limited interest, often for a limited term or purpose",
                  "Claims to bhumidhari status; ejectment proceedings"
                ],
                [
                  "Gram Sabha / public land",
                  "Section 67 and Rules 66&ndash;67",
                  "Not transferable to a private person",
                  "Encroachment and eviction proceedings"
                ]
              ]
            }
          },
          {
            id: "kinds",
            heading: "The disputes that actually recur",
            paras: [
              "Agricultural land litigation in and around Lucknow is remarkably repetitive. The same half-dozen fact patterns account for most of it, and recognising which one you are in tells you a great deal about what has to be done.",
              "<strong>Co-sharer disputes after a death.</strong> Land is recorded in the name of a deceased holder, several heirs are entered jointly, one of them cultivates the whole holding and the others discover years later that their share exists only on paper. The remedy is division of the holding, and the longer it is left the harder the possession position becomes to unpick.",
              "<strong>Sales by a person who could not sell.</strong> A deed is executed by a holder whose class of right did not permit transfer, or by one co-sharer purporting to sell the entire holding, or by an attorney whose authority did not extend to the sale. The deed is registered, which persuades the buyer it is sound, and the problem surfaces at mutation.",
              "<strong>Record entries made without an order.</strong> A name appears in the khatauni, or disappears from it, without any traceable order of a competent authority behind it. The Allahabad High Court held in 2025 that no mutation or change can be recorded in the khatauni without an order of the competent authority, and that entries which are fraudulent or without legal basis can be corrected even when they have stood for a long time.",
              "<strong>Boundary and possession disputes.</strong> Two neighbours cultivate up to a line neither can prove, and the khasra numbers on paper do not match what is on the ground. These are demarcation matters, and they are dealt with separately below.",
              "<strong>Public land in private hands.</strong> Land recorded as Gram Sabha property &mdash; a pond, a path, a chak road, grazing land &mdash; is cultivated or built upon. These attract summary eviction proceedings rather than an ordinary suit."
            ]
          },
          {
            id: "forum",
            heading: "Which forum decides what",
            paras: [
              "Choosing the forum is the first real decision in an agricultural land matter, and it is the one most often got wrong. Revenue courts under the Code deal with the land as land: tenure, record entries, division of holdings, ejectment, boundaries, and the consequences of the Code's own restrictions. Civil courts retain jurisdiction over questions that are genuinely questions of title and contract &mdash; the validity of a deed, specific performance of an agreement to sell, cancellation of an instrument &mdash; where the Code does not bar them.",
              "The line is not always obvious, and the answer is often that both have a part. A buyer whose sale deed is sound but whose mutation has been refused has a revenue problem. A buyer whose seller had no right to sell has a civil problem that will also need the record corrected afterwards. Establishing which you have, on the documents, before anything is filed, is the single most valuable thing done at the start of one of these matters.",
              "Within the revenue system the Code builds a conventional ladder. Most first-instance work sits with the Tehsildar or the Sub-Divisional Officer depending on the proceeding. Appeals lie under Section 207, read with the Third Schedule, which lists what is appealable &mdash; and the Third Schedule matters, because an order not listed there carries no appeal at all. Revision lies under Section 210 to the Commissioner or the Board of Revenue. The High Court has held that the revisional power under Section 210 reaches even a final order passed by the Commissioner in a first appeal, and that it extends to interlocutory orders, describing that jurisdiction as a duty as much as a power."
            ]
          },
          {
            id: "records",
            heading: "Why the record decides so much",
            paras: [
              "A khatauni entry is not conclusive proof of title. Every court says so, and it is true. But it is treated as presumptive, it is what the tehsil acts on, it is what a bank lends against, and it is what a purchaser's advocate reads. A person who is right on title but wrong on the record will spend years establishing a position that the record would have given them immediately.",
              "That is why record work is not clerical work in agricultural matters. Section 32 empowers a revenue officer to record changes and correct errors that are proved; Section 38 provides the route for correcting an error or omission in the map, the khasra or the khatauni. Both have limits. The courts have repeatedly held that a correction application resting only on possession, which in substance raises an intricate question of title, is not maintainable &mdash; the correction route cannot be used to decide a title dispute by the back door.",
              "There is a practical consequence worth stating plainly. If your real grievance is that someone else has been recorded as the holder of your land, a correction application alone will usually fail, and the time spent on it is time in which the other side's entry continues to look settled. The question of what you are actually asking the record to do, and whether a declaration has to come first, should be settled before the application is drafted."
            ]
          },
          {
            id: "evidence",
            heading: "What decides these cases: the documents",
            paras: [
              "Agricultural land disputes are won and lost on paper that was generated years before anyone thought there would be a dispute. The documents that carry weight are mostly the dull ones.",
              "What matters is the continuity between them. A chain in which the khatauni, the khasra entries, the mutation orders and the deeds all describe the same land, the same extent and the same people is very hard to attack. A chain with a gap in it &mdash; a mutation with no order behind it, an extent that changes between two documents, a gata number that appears from nowhere &mdash; is where the other side will concentrate."
            ],
            list: [
              "The khatauni for the relevant fasli years, not just the current one, so the sequence of entries can be read",
              "The khasra, which records what was actually cultivated and by whom",
              "Mutation orders, with the order itself and not merely the resulting entry",
              "The deeds in the chain, and the registration endorsements on them",
              "Any consolidation record, where the village has been through chakbandi",
              "Partition or family settlement documents, registered or otherwise",
              "Receipts for land revenue and, where relevant, electricity and canal dues",
              "Any earlier order of a revenue court or civil court touching the same land"
            ]
          },
          {
            id: "possession",
            heading: "Possession, and why it is treated so seriously",
            paras: [
              "In rural land matters, possession does a great deal of work. It influences which proceeding is appropriate, it affects what interim protection is realistic, and in some circumstances, over long enough periods, it affects rights themselves. A party in settled possession with a supporting record entry is in a strong position even against someone with an arguable claim on title.",
              "That is why the first question in most of these matters is not <em>who owns this</em> but <em>who is on it, since when, and what does the record say about that</em>. It is also why delay is so costly. A person who waits five years to complain about an entry is explaining not only the entry but the five years.",
              "Where land is about to be transferred, built on or altered, interim protection becomes the immediate priority, and it is decided on the documents that can be produced at once rather than the ones that could be obtained in a month. Having the record and the chain ready before the application is made is the difference between an interim order and an adjournment."
            ]
          },
          {
            id: "lucknow",
            heading: "Lucknow and the districts around it",
            paras: [
              "Lucknow district has a particular pattern of agricultural land dispute, because the city has expanded over villages that were cultivated within living memory. Land on the Sitapur Road, Hardoi Road, Kursi Road and Sultanpur Road corridors has moved from agricultural use to plotted development in a single generation, and much of the litigation arises from that transition: land sold as agricultural and used for building without the declaration that converts it, holdings divided informally between heirs and then sold in pieces, and development authority planning that sits on top of a revenue record nobody updated.",
              "The firm's office is in Lucknow and matters in other districts of Uttar Pradesh are conducted from here before the court, tribunal or authority that has jurisdiction over the land. For agricultural land that is almost always the forum local to where the land lies, not where the parties live, which is worth knowing at the outset if the holding is in one district and the family has moved to another."
            ]
          },
          {
            id: "approach",
            heading: "How the firm approaches an agricultural land matter",
            paras: [
              "The first meeting is a document meeting. Agricultural land cannot be assessed from a description, and an opinion given on a summary of the facts is worth very little. What is examined is the sequence: what the record said then, what it says now, what order explains the change, and whether the chain is internally consistent.",
              "From that, three things are settled before anything is filed: which forum the matter belongs in, what is actually being asked for, and whether anything needs to be protected immediately. Those three answers determine the shape of the case, and getting them right at the start saves far more than it costs.",
              "No outcome is promised in any matter. What can be given, once the papers are seen, is an account of the stages a matter of that kind passes through, the documents that will decide it, and what is missing from the file that ought to be obtained."
            ]
          }
        ],
        faqs: [
          [
            "Can a civil court decide my agricultural land dispute?",
            "Sometimes, and sometimes not. The UP Revenue Code reserves a range of questions about agricultural land to revenue courts, and a civil court cannot decide those. Questions that are genuinely about the validity of a deed or enforcement of a contract often remain with the civil court. Many matters need both, in sequence. Which applies to your land is settled on the documents before anything is filed, because a decree from a court without jurisdiction does not help you."
          ],
          [
            "My name is in the khatauni. Does that mean I own the land?",
            "No. A khatauni entry is treated as presumptive and is what the tehsil and banks act on, but it is not conclusive proof of title. Equally, being left out of the record does not extinguish a right. The practical position is that the record matters enormously even though it does not decide ownership, which is why record work and title work usually have to be done together."
          ],
          [
            "Someone has been entered in the record without any order. What can be done?",
            "The Allahabad High Court held in 2025 that no mutation or change can be recorded in a khatauni without an order of the competent authority, and that entries which are fraudulent or without legal basis can be corrected even if they are long-standing. The route depends on what the entry is and what it displaced. An application to correct an error is one thing; displacing an entry that rests on a decided proceeding is another, and the second usually needs more than a correction application."
          ],
          [
            "I bought agricultural land and the tehsil has refused mutation. Why?",
            "The most common reasons are that the seller's class of tenure did not permit the transfer, that the seller was one of several co-sharers and sold more than their share, that the land is subject to a restriction the deed ignored, or that the chain of record entries does not support the seller's position. Which it is can be established from the khatauni sequence and the deed, and the answer determines whether this is a record problem or a title problem."
          ],
          [
            "How long do these matters take?",
            "That depends on the forum, the nature of the dispute, how many parties there are and how much evidence has to be recorded, and no period given in the abstract is worth anything. What can be given once the papers are seen is an account of the stages a matter of that kind passes through, and what can realistically be done at each."
          ]
        ],
        related: [
          ["Property Disputes", "property-law-and-registration/property-dispute-lawyer-lucknow/index.html"],
          ["Property Partition", "property-law-and-registration/property-partition-lawyer-lucknow/index.html"],
          ["Mutation (Dakhil Kharij)", "property-law-and-registration/mutation-dakhil-kharij-lucknow/index.html"],
          ["Property Title Verification", "property-law-and-registration/property-title-verification-lucknow/index.html"]
        ]
      },

      /* ============================================================ */
      {
        slug: "land-demarcation-lawyer-lucknow",
        navLabel: "Land Demarcation",
        name: "Land Demarcation Lawyer in Lucknow",
        h1: "Land Demarcation Lawyer in Lucknow",
        title: "Land Demarcation Lawyer in Lucknow | Section 24 Paimaish Guidance",
        description:
          "Land demarcation in Lucknow under Section 24 of the UP Revenue Code: how paimaish is ordered, how the measurement is done, boundary pillars, appeals under Section 24(4) and what to do about an ex parte order.",
        lead:
          "How a boundary is fixed on the ground under Section 24 of the UP Revenue Code, what the measurement actually proves, and the remedies when a demarcation goes against you.",
        datePublished: "2026-10-29",
        dateModified: "2026-10-29",
        sections: [
          {
            id: "what",
            heading: "What demarcation is, and what it is not",
            paras: [
              "Demarcation &mdash; <em>paimaish</em> &mdash; is the process by which the boundary of a holding recorded on a revenue map is marked out on the ground. It answers a narrow question: given the map and the record, where does this plot physically lie? It is carried out under <strong>Section 24 of the Uttar Pradesh Revenue Code, 2006</strong>, and in practice it is one of the most frequently used provisions in the whole Code.",
              "What demarcation does not do is decide who owns the land. It takes the record as it stands and projects it onto the ground. If the record is wrong, a demarcation will faithfully reproduce the error on the soil. This is the single most important thing to understand before applying for one, because a great many applicants expect a demarcation to settle a title dispute and are then surprised when it does not.",
              "Used properly, however, it is powerful. Where the record is sound and the quarrel is about where the line runs &mdash; a neighbour who has ploughed three feet further each year, a wall built on an assumed boundary, a purchaser who cannot find the plot described in the deed &mdash; demarcation is the direct remedy and often the only one that produces a usable answer."
            ]
          },
          {
            id: "when",
            heading: "When demarcation is the right application",
            paras: [
              "Demarcation is appropriate when the dispute is about position rather than entitlement. The test is simple: if both sides agree what the record says and disagree only about where that translates to on the ground, demarcation will resolve it. If they disagree about what the record should say, demarcation will not.",
              "It is also commonly used before a transaction rather than after a quarrel, and that is the better time to do it. A buyer of agricultural land who has the plot demarcated before paying has converted an abstract khasra number into a measured piece of ground with pillars on it. That is worth far more than the fee, and it prevents the most expensive category of rural land dispute, which is the one discovered after the money has moved."
            ],
            table: {
              caption: "Which proceeding fits which problem",
              head: ["The problem", "Usual route", "What it decides"],
              rows: [
                [
                  "The line on the ground is disputed; the record is agreed",
                  "Demarcation under Section 24",
                  "Where the recorded boundary physically falls"
                ],
                [
                  "The map itself is wrong",
                  "Correction of the map, with the record provisions",
                  "What the map should show"
                ],
                [
                  "The khatauni names the wrong person",
                  "Correction under Section 38, or a declaration",
                  "What the record should say, or who holds the land"
                ],
                [
                  "Co-sharers want separate possession",
                  "Division of the holding",
                  "Which part of the holding belongs to whom"
                ],
                [
                  "Someone has encroached on Gram Sabha land",
                  "Proceedings under Section 67",
                  "Eviction and damages for public land"
                ]
              ]
            }
          },
          {
            id: "procedure",
            heading: "How the proceeding runs",
            paras: [
              "An application is made to the competent revenue authority at the tehsil for demarcation of a specified gata or gatas. The matter is assigned for measurement, and the measurement is carried out on site by revenue staff using the village map and the relevant records, with the parties and the adjoining holders expected to be present.",
              "The measurement is not a matter of stretching a tape between two points. It is done by reference to the map, which means fixed reference points have to be identified and the plot located relative to them. Where the village has been through consolidation, the consolidation map and the chak boundaries are the reference. Where it has not, older settlement maps may be used. The quality of a demarcation depends almost entirely on whether this reference work has been done properly, which is why a report that simply records a conclusion without showing how the points were fixed is vulnerable on appeal.",
              "A report follows, and an order on it. If the demarcation is accepted, boundary pillars are erected on the line that has been fixed. The pillars matter: a demarcation order whose pillars have never been put in on the ground has, in practical terms, achieved very little, and the Allahabad High Court has dealt with precisely that complaint &mdash; a demarcation report where the boundary pillars had not been erected."
            ]
          },
          {
            id: "presence",
            heading: "Why attendance and notice decide so many of these cases",
            paras: [
              "A demarcation affects every holder whose land touches the line being fixed, not only the applicant. That is why notice to adjoining tenure holders is not a formality, and why a demarcation conducted without it is so often set aside.",
              "The point arises constantly in practice. A demarcation is obtained ex parte, pillars go in, and the neighbour discovers months later that a line has been fixed across land they were cultivating. The Allahabad High Court has held that an affected adjoining tenure holder can seek recall of an ex parte demarcation order, which is usually the first and fastest step in that situation &mdash; faster, certainly, than a writ petition, which the High Court routinely declines where the Code provides a remedy.",
              "The corollary applies to applicants. A demarcation obtained without proper notice to everyone affected is a demarcation waiting to be undone. It is better to have every adjoining holder served and present, even where that makes the proceeding slower, because the resulting order is then worth something."
            ]
          },
          {
            id: "remedies",
            heading: "If the demarcation goes against you",
            paras: [
              "Section 24 contains its own appeal. An appeal against a demarcation order lies under <strong>Section 24(4)</strong>, and that is the ordinary route. Beyond it, Section 210 provides revision to the Commissioner or the Board of Revenue, and the High Court has described the Section 210 remedy as the alternative that makes a writ petition unnecessary in these matters &mdash; writs challenging demarcation orders are frequently dismissed on exactly that ground.",
              "There is an important practical point about what to challenge. An appeal against the conclusion of a demarcation rarely succeeds on the bare assertion that the line is in the wrong place. What succeeds is an attack on the method: that the reference points were not fixed, that the map used was not the right one, that the adjoining holders were not heard, that the report does not disclose how the measurement was arrived at. Demarcation appeals are won on process."
            ],
            list: [
              "Recall of an ex parte order, where you were not heard &mdash; usually the quickest route",
              "Appeal under Section 24(4) against the demarcation order",
              "Revision under Section 210 to the Commissioner or the Board of Revenue",
              "An application about non-erection of pillars, where the order exists but was never implemented on the ground"
            ]
          },
          {
            id: "documents",
            heading: "What to bring",
            paras: [
              "A demarcation application is built almost entirely from record material, and the application is only as good as the papers behind it. Bringing the originals to a first discussion matters here more than in most matters, because the gata numbers and the map have to be read together and neither can be assessed from a description."
            ],
            list: [
              "Current khatauni for the gata or gatas concerned",
              "Khasra entries, which show cultivation",
              "The village map, or the consolidation map where the village has been consolidated",
              "Your deed, where you acquired the land by transfer",
              "Any earlier demarcation report or order touching the same land",
              "Names and details of every adjoining tenure holder, which will be needed for notice",
              "Photographs of what is actually on the ground &mdash; walls, crops, structures, pillars"
            ]
          },
          {
            id: "mistakes",
            heading: "The mistakes that cost people their demarcation",
            paras: [
              "<strong>Applying for demarcation when the real dispute is about the record.</strong> If your complaint is that the khatauni shows the wrong extent, demarcation will measure the wrong extent accurately. Fix the record first, or run both.",
              "<strong>Leaving out an adjoining holder.</strong> It makes the proceeding faster and the order worthless.",
              "<strong>Accepting a report that does not show its working.</strong> A report that states a conclusion without disclosing the reference points and the method is difficult to defend if the other side appeals, and difficult to attack if you need to.",
              "<strong>Not getting the pillars put in.</strong> An order on paper that has never been implemented on the ground is routinely treated by the other side as though it does not exist, and the position deteriorates from there.",
              "<strong>Going straight to the High Court.</strong> Where the Code gives an appeal under Section 24(4) and a revision under Section 210, a writ petition is likely to be sent back to those remedies, having cost time."
            ]
          },
          {
            id: "report",
            heading: "What a demarcation report should contain",
            paras: [
              "Most demarcation appeals turn on the report rather than on the result, so it is worth knowing what a defensible report looks like before you receive one. A report that records a conclusion and nothing else leaves everybody guessing, and it is equally difficult to rely on and to attack.",
              "A sound report identifies the map it worked from and the edition of that map, because the answer can differ between a settlement map and a consolidation map of the same village. It names the fixed reference points used to locate the plot, and explains how the measurement proceeded from those points to the boundary in question. It records who was present, which matters because the absence of an adjoining holder is the most common ground on which these orders are later recalled. It states the extent found and sets that against the extent recorded, and where the two differ it says so plainly rather than quietly adopting one of them.",
              "Where the report departs from the record, the reason should appear on its face. A boundary that cannot be reconciled with the map usually indicates something worth knowing &mdash; an old encroachment, a division never carried into the record, a map error &mdash; and a report that simply draws a line without addressing the discrepancy has postponed the dispute rather than resolved it.",
              "If a report arrives without these elements, the time to say so is before the order is passed on it. Objections to the method, raised at that stage, are far more effective than an appeal against the conclusion months later."
            ]
          },

          {
            id: "lucknow",
            heading: "Demarcation in Lucknow district",
            paras: [
              "Demarcation work around Lucknow has a distinct character because so much of the district's agricultural land is now worth more as plots than as fields. Where land has been informally divided among heirs, sold in parts, and then built on without the boundaries ever being fixed, the map and the ground can diverge considerably, and a demarcation becomes the only way to establish what anyone actually bought.",
              "The firm conducts demarcation matters before the revenue authorities having jurisdiction over the land. Where the land lies in another district of Uttar Pradesh, the proceeding is conducted there from the Lucknow office, and attendance is arranged for the measurement itself, which is the stage at which presence counts for most."
            ]
          }
        ],
        faqs: [
          [
            "Does demarcation decide who owns the land?",
            "No. Demarcation takes the record as it stands and marks it out on the ground. It establishes where a recorded boundary physically falls, not who is entitled to the land. If the record is wrong, the demarcation will reproduce that error accurately. Where ownership is genuinely in dispute, demarcation is at most one part of the matter."
          ],
          [
            "A demarcation was done without telling me and now there are pillars on my field. What do I do?",
            "Act quickly. An affected adjoining tenure holder can seek recall of an ex parte demarcation order, and the Allahabad High Court has recognised that route. There is also an appeal under Section 24(4) and revision under Section 210. Which is right depends on what was passed and when you learned of it, so the order and the date of knowledge are the first things to establish."
          ],
          [
            "Can I go straight to the High Court against a demarcation order?",
            "You can file, but you will usually be sent back. The Code provides an appeal under Section 24(4) and a revision under Section 210, and the High Court regularly declines to interfere where those remedies exist. The practical effect of going to the writ court first is lost time."
          ],
          [
            "Should I get a demarcation done before buying agricultural land?",
            "In most cases yes, and it is the cheapest protection available in a rural land purchase. It converts a khasra number into a measured piece of ground with pillars on it, and it exposes the discrepancy between the record and the ground before the money moves rather than afterwards."
          ],
          [
            "The demarcation order was passed but nothing was marked on the ground. Is it effective?",
            "In principle the order stands, but in practice an unimplemented demarcation achieves very little, and the other side will behave as though it does not exist. Erection of the boundary pillars is the step that makes the order real, and the High Court has dealt with complaints about precisely that omission."
          ]
        ],
        related: [
          ["Agricultural Land Disputes", "property-law-and-registration/agricultural-land-dispute-lawyer-lucknow/index.html"],
          ["Khatauni Correction", "property-law-and-registration/khatauni-correction-lawyer-lucknow/index.html"],
          ["Property Partition", "property-law-and-registration/property-partition-lawyer-lucknow/index.html"],
          ["Property Disputes", "property-law-and-registration/property-dispute-lawyer-lucknow/index.html"]
        ]
      },

      /* ============================================================ */
      {
        slug: "khatauni-correction-lawyer-lucknow",
        navLabel: "Khatauni Correction",
        name: "Khatauni Correction Lawyer in Lucknow",
        h1: "Khatauni Correction Lawyer in Lucknow",
        title: "Khatauni Correction Lawyer in Lucknow | Section 38 Record Correction",
        description:
          "Correcting the khatauni in Uttar Pradesh: Section 38 applications, the difference between a clerical error and a title dispute, mutation under Sections 34 and 35, and what the 2025 Allahabad High Court ruling changed.",
        lead:
          "How an error in the khatauni, khasra or village map is corrected under the UP Revenue Code, and why most correction applications fail for asking the wrong thing.",
        datePublished: "2026-10-29",
        dateModified: "2026-10-29",
        sections: [
          {
            id: "record",
            heading: "What the khatauni is, and why an error in it hurts",
            paras: [
              "The khatauni is the record of rights for agricultural land in Uttar Pradesh: the register that says who holds which gata, in what class of tenure, and in what share. Alongside it sit the khasra, which records what was actually cultivated and by whom, and the village map, which shows where the gatas lie. Together they are the operational truth of rural landholding, maintained under the Uttar Pradesh Revenue Code, 2006.",
              "An entry in the khatauni is not conclusive proof of ownership. That is settled, and every court repeats it. But the distinction is thinner in practice than it sounds. The tehsil acts on the record. Banks lend against it. Buyers read it. Compensation on acquisition is worked out from it. A person who is right on title but absent from the record will spend years proving a position that a correct entry would have given them at once.",
              "That is why a wrong entry is not a paperwork irritation. Left alone, it hardens. The longer an incorrect name sits in the khatauni, the more transactions are built on it, the more people rely on it, and the harder it becomes to displace."
            ]
          },
          {
            id: "two-routes",
            heading: "Correction and mutation are different things",
            paras: [
              "The most common and most expensive confusion in this area is between correcting an error and recording a change. They are separate proceedings with separate tests, and asking for the wrong one wastes the application.",
              "<strong>Mutation</strong> &mdash; <em>dakhil kharij</em> &mdash; records a change that has genuinely happened: a sale, an inheritance, a gift. The record was right before and needs to be brought up to date. Mutation is dealt with under Sections 34 and 35 of the Code, usually ordered by the Tehsildar after verification by the lekhpal and a window for objections.",
              "<strong>Correction</strong> deals with an entry that was wrong when it was made, or an omission that should never have happened. Section 38 provides the route: an application for correction of an error or omission in the map, the field book (khasra) or the record of rights (khatauni) is made to the Tahsildar in the prescribed manner. The Tahsildar makes an inquiry and refers the matter with a report, and the case is decided by the Collector or the Sub-Divisional Officer after considering objections and evidence. Section 32 separately empowers a revenue officer to record changes and to correct errors that are proved.",
              "Putting a succession through as a correction, or a genuine clerical slip through as a mutation, produces an order that does not do what you needed."
            ],
            table: {
              caption: "Which proceeding does what",
              head: ["Proceeding", "Used for", "Decided by", "Test applied"],
              rows: [
                [
                  "Mutation (Sections 34&ndash;35)",
                  "Recording a sale, inheritance or gift that has actually taken place",
                  "Tehsildar, after lekhpal verification and objections",
                  "Has a transfer or succession occurred, on the documents"
                ],
                [
                  "Correction (Section 38)",
                  "Error or omission in the map, khasra or khatauni",
                  "Collector or SDO, on the Tahsildar's report",
                  "Was the entry wrong when made, and is that provable"
                ],
                [
                  "Recording changes (Section 32)",
                  "Changes and proved errors in the record of rights",
                  "Revenue officer",
                  "Is the change or error established"
                ],
                [
                  "Declaration of rights",
                  "A genuine dispute about who holds the land",
                  "The court with jurisdiction over the question",
                  "Who is entitled, on title and evidence"
                ]
              ]
            }
          },
          {
            id: "limits",
            heading: "The limit that defeats most applications",
            paras: [
              "Correction proceedings are summary. They exist to fix errors, not to decide contested entitlement, and the courts guard that boundary firmly. A correction application that rests only on possession, and which in substance raises an intricate question of title, is not maintainable.",
              "This is where most correction applications fail, and the failure is usually avoidable. If your complaint is <em>the record wrongly records the extent of my gata as 0.180 hectare when every document says 0.220</em>, that is a correction. If your complaint is <em>my cousin has been recorded as the holder and he has no right to the land</em>, that is a title dispute wearing a correction application's clothes, and it will generally be rejected as not maintainable.",
              "The practical consequence is serious. Time spent on a correction application that was never going to succeed is time in which the opposing entry continues to look settled, and in which the other side may transact on it. Establishing at the outset which kind of problem you actually have &mdash; and whether a declaration has to come first, with the record correction following it &mdash; is the most valuable thing done in these matters."
            ]
          },
          {
            id: "order",
            heading: "No entry without an order: the 2025 position",
            paras: [
              "A 2025 judgment of the Allahabad High Court stated the principle with unusual directness: no mutation or change can be recorded in the khatauni without an order of the competent authority. An entry that simply appeared, with no traceable order behind it, is not a lawful entry.",
              "The same judgment made a second point that matters a great deal to people who discover an old problem late. Entries that are fraudulent or that lack any legal basis can be corrected even when they have stood for a long time. Age alone does not launder an entry that should never have been made.",
              "That gives a clear first question whenever a khatauni entry is disputed: <em>what order produced this entry</em>. Obtaining the order, and not merely the resulting entry, is the starting point of the file. If no order exists, the position is materially stronger than it looks. If an order does exist, then the real target is that order, and the route is an appeal or revision against it rather than a fresh correction application."
            ]
          },
          {
            id: "procedure",
            heading: "How a Section 38 application runs",
            paras: [
              "The application goes to the Tahsildar, identifying the gata, the entry complained of and the correction sought. The Tahsildar causes an inquiry to be made &mdash; which in practice means a lekhpal report and a site position &mdash; and refers the matter upward with that report. Notice goes to anyone whose entry would be affected, objections are taken, evidence is considered, and the Collector or the Sub-Divisional Officer decides.",
              "The quality of the application decides most of what follows. An application that says the entry is wrong, without showing from the earlier record what it should have been and what produced the mistake, puts the whole burden on an inquiry that may or may not do it for you. An application that sets out the sequence &mdash; what the record said in a stated fasli year, what it says now, which order intervened, and why that order cannot explain the present entry &mdash; is doing the work the decision needs.",
              "If the order goes against you, the Code's ordinary remedies apply. Appeal lies under Section 207, read with the Third Schedule, which lists what is appealable. Revision lies under Section 210 to the Commissioner or the Board of Revenue, and the High Court has held that the revisional power under Section 210 reaches even a final order passed in a first appeal, and extends to interlocutory orders as well. Where mutation under Section 35 is concerned, an appellate order under Section 35(2) against which no further appeal lies still remains subject to the Commissioner's revisional jurisdiction under Section 210."
            ]
          },
          {
            id: "documents",
            heading: "The documents that decide a correction",
            paras: [
              "Correction matters are decided almost entirely on the historic record. The current khatauni is the least useful document in the file, because it states the problem rather than the answer. What matters is the sequence that led to it."
            ],
            list: [
              "Khatauni for several fasli years, so the entry can be traced to the point where it changed",
              "The khasra for the same years, which often shows the true cultivation position",
              "The order that produced the disputed entry &mdash; the order itself, not the entry",
              "Deeds in the chain, with registration endorsements",
              "Any consolidation record, where the village has been through chakbandi",
              "Succession material, where the entry followed a death",
              "Land revenue receipts, and any other document showing who dealt with the land",
              "A certified copy of the current record, not an unattested portal printout"
            ],
            after: [
              "On that last point: the khatauni can be viewed free on the state's land records portal, but what the portal prints is unattested. For a bank, a court or a serious transaction, a certified copy obtained through the tehsil or a Jan Seva Kendra is what is needed. It is also worth verifying a mutation against the physical register at the circle office rather than relying on the portal alone, because the two can differ."
            ]
          },
          {
            id: "shares",
            heading: "Co-owners and the gata-wise share position",
            paras: [
              "Where land is held jointly, the record has historically recorded shares in ways that made it difficult to tell which co-sharer's interest attached to which gata. That creates problems at every later stage: on a sale by one co-sharer, on partition, on acquisition compensation, and on any mortgage.",
              "Following a Board of Revenue direction in October 2025, co-owners' shares are being fixed gata by gata rather than left as an undivided fraction across the whole holding. For families with scattered joint holdings this is a significant practical improvement, and it is worth checking how your holding is presently recorded, because the position as it stands now is what a buyer or a bank will read.",
              "It also changes what a correction application may need to ask for. Where the complaint is that a share has been recorded against the wrong gatas, the relief has to be framed with that in mind rather than as a general assertion that the share is wrong."
            ]
          },
          {
            id: "reading",
            heading: "Reading a khatauni properly",
            paras: [
              "A great many record problems are discovered late simply because nobody read the khatauni carefully at the time it mattered. It is a dense document and it rewards attention.",
              "Read the fasli year first, because a khatauni is a snapshot of a particular year and an old extract tells you nothing about the present. Then read the khata number and the gata numbers together: a khata is the account, and the gatas are the plots within it, and a holding frequently spans gatas that are nowhere near one another. The area against each gata is where arithmetic errors hide, and the totals should be added rather than assumed.",
              "The share column is the one that causes most later trouble. Where land is held jointly, the record may show a fraction without saying which gata the fraction attaches to, which makes it impossible to tell what a co-sharer may sell. Following a Board of Revenue direction in October 2025 those shares are being fixed gata by gata, and how a particular holding is presently recorded is worth checking, because that is what a buyer or a bank will read.",
              "The class of tenure is the next thing to look for, since it determines whether the land can be transferred at all. Finally, read the remarks column, which is where the record notes charges, restrictions, pending proceedings and the orders that produced entries. A great deal of what matters about a holding is recorded there in a few words, and it is the column most often skipped."
            ]
          },

          {
            id: "approach",
            heading: "How the firm handles a record correction",
            paras: [
              "The first step is always to obtain the order behind the entry, together with the khatauni for the years on either side of the change. Until that is in hand, nothing useful can be said about the matter, because the available remedies depend entirely on whether an order exists and what it decided.",
              "From there, the question is the one set out above: is this an error, or is it a dispute about entitlement. If it is an error, a Section 38 application is drafted around the documentary sequence. If it is a dispute, the record correction is the second step and something else is the first, and saying so at the outset saves a wasted proceeding.",
              "Matters are conducted before the revenue authorities having jurisdiction over the land. Where the land lies in another district of Uttar Pradesh, the proceeding is conducted there from the Lucknow office."
            ]
          }
        ],
        faqs: [
          [
            "How is correcting the khatauni different from mutation?",
            "Mutation records a change that has actually happened &mdash; a sale, an inheritance, a gift &mdash; and is dealt with under Sections 34 and 35. Correction under Section 38 deals with an entry that was wrong when it was made, or an omission. They have different tests and different deciding authorities, and applying under the wrong one produces an order that does not solve the problem."
          ],
          [
            "Someone else's name is in the khatauni for my land. Can I just apply for correction?",
            "Usually not, on its own. A correction application that rests only on possession and in substance raises an intricate question of title is not maintainable. If the dispute is about who is entitled to the land, that has to be decided first, with the record correction following. The first thing to establish is what order produced the entry you are complaining about."
          ],
          [
            "The wrong entry has been there for fifteen years. Is it too late?",
            "Not necessarily. The Allahabad High Court held in 2025 that entries which are fraudulent or without legal basis can be corrected even when they are long-standing, and that no change can be recorded in a khatauni without an order of the competent authority. Age makes the practical position harder but does not by itself validate an entry that should never have been made."
          ],
          [
            "Is the khatauni I downloaded from the portal good enough?",
            "For reading, yes. For a bank, a court or a transaction, no &mdash; the portal printout is unattested. A certified copy obtained through the tehsil or a Jan Seva Kendra is what is required. It is also sensible to check a mutation against the physical register at the circle office, because the portal and the register can differ."
          ],
          [
            "What if the correction is refused?",
            "The Code provides the usual ladder. Appeal lies under Section 207 read with the Third Schedule, which lists what is appealable, and revision lies under Section 210 to the Commissioner or the Board of Revenue. The High Court has held that the Section 210 power reaches final appellate orders and interlocutory orders alike. Which applies depends on what was passed, so the order is the first document to obtain."
          ]
        ],
        related: [
          ["Mutation (Dakhil Kharij)", "property-law-and-registration/mutation-dakhil-kharij-lucknow/index.html"],
          ["Agricultural Land Disputes", "property-law-and-registration/agricultural-land-dispute-lawyer-lucknow/index.html"],
          ["Revenue Court Matters", "property-law-and-registration/revenue-court-lawyer-lucknow/index.html"],
          ["Property Title Verification", "property-law-and-registration/property-title-verification-lucknow/index.html"]
        ]
      },

      /* ============================================================ */
      {
        slug: "land-use-conversion-lawyer-lucknow",
        navLabel: "Land Use Conversion",
        name: "Land Use Conversion Lawyer in Lucknow",
        h1: "Land Use Conversion Lawyer in Lucknow",
        title: "Land Use Conversion Lawyer in Lucknow | Section 80 Declaration",
        description:
          "Converting agricultural land to non-agricultural use in Uttar Pradesh: the Section 80 declaration, the 2026 amendment that treats building plan approval as conversion, cancellation under Section 82 and master plan sanction.",
        lead:
          "How agricultural land in Uttar Pradesh is lawfully put to non-agricultural use, what the 2026 amendment changed, and why building first and converting later is the most expensive order to do it in.",
        datePublished: "2026-10-29",
        dateModified: "2026-10-29",
        sections: [
          {
            id: "why",
            heading: "Why conversion exists at all",
            paras: [
              "Land recorded as agricultural in the khatauni is, in the eyes of the revenue system, agricultural land &mdash; whatever is standing on it. Putting a house, a warehouse, a school or a petrol pump on it does not change its recorded character. Conversion is the process by which the record is made to match the intended use, and until it happens the land remains agricultural land with a building on it.",
              "People discover this at the worst possible moments: when a buyer's advocate reads the khatauni, when a bank declines to lend against the property, when a building plan is refused, when a sale falls through at the last stage, or when the authorities take notice of unauthorised non-agricultural use. All of those are far more expensive than the conversion would have been.",
              "In Uttar Pradesh the mechanism is the declaration under <strong>Section 80 of the Uttar Pradesh Revenue Code, 2006</strong>: an application through the tehsil machinery for land recorded as agricultural to be declared to be held for a non-agricultural purpose, decided by the empowered revenue officer, with the change then carried into the khatauni."
            ]
          },
          {
            id: "amendment",
            heading: "What changed in 2026",
            paras: [
              "The most important recent development in this area is an amendment to Section 80 approved by the Uttar Pradesh cabinet in March 2026. In areas falling within a development authority or an industrial development authority, approval of a building plan is now treated as the land-use conversion itself, removing the separate conversion application that used to be required in addition.",
              "For plots inside the Lucknow Development Authority's area and comparable authority areas elsewhere in the state, this collapses two processes into one and removes a step that regularly held up projects for no useful purpose. Where a building plan is sanctioned by the concerned authority, that sanction is treated as the conversion.",
              "Two cautions attach to this, and they matter. First, the relief is tied to being inside an authority area &mdash; land outside one is not covered and still needs the Section 80 route. Second, amendments of this kind move from ordinance to Act and their commencement and scope should be checked as they stand when your application is made, not as they were reported. The position for a particular plot turns on where the plot is and what the operative notification says, and that should be established before anything is assumed."
            ],
            table: {
              caption: "Which route applies to a plot",
              head: ["Where the land lies", "Route to non-agricultural use", "Decided by"],
              rows: [
                [
                  "Inside a development or industrial development authority area",
                  "Approval of the building plan, which is treated as the conversion under the 2026 amendment",
                  "The development or industrial development authority"
                ],
                [
                  "Outside an authority area",
                  "Declaration under Section 80 of the UP Revenue Code",
                  "The empowered revenue officer through the tehsil"
                ],
                [
                  "Inside a master plan area, for the land use itself",
                  "The plot's land use under the master plan governs what may be built",
                  "The planning authority"
                ],
                [
                  "Where a declaration already exists but is challenged",
                  "Cancellation proceedings under Section 82",
                  "The authority empowered under that section"
                ]
              ]
            }
          },
          {
            id: "master-plan",
            heading: "Conversion is not planning permission",
            paras: [
              "A Section 80 declaration changes the character of the land in the revenue record. It does not tell you what may be built on it. Where a plot sits inside a master plan area, the land use assigned by the master plan governs that question, and the planning regime sits above the revenue declaration rather than beside it.",
              "The distinction catches people out regularly. A plot can be lawfully declared non-agricultural and still be unbuildable for the purpose the owner had in mind, because the master plan designates it for something else. Conversely, a plot with a sanctioned building plan inside an authority area now carries its conversion with it under the 2026 amendment.",
              "The sensible order of work is therefore to establish the plot's planning position first &mdash; which zone it falls in, what the master plan permits, whether it lies inside an authority area at all &mdash; and only then to decide which conversion route applies. Doing it the other way round produces conversions that turn out to be useless."
            ]
          },
          {
            id: "not-automatic",
            heading: "Conversion is a decision, not a formality",
            paras: [
              "A declaration under Section 80 is an exercise of judgment by a revenue officer, not a counter transaction. The officer has to be satisfied on the material placed, and the courts have been willing to intervene where that has not happened properly in either direction.",
              "The Allahabad High Court has held that agricultural land cannot be declared non-agricultural merely because the plot was found vacant at the time of inspection. Vacancy is not the test. A plot lying fallow is still agricultural land, and an inspection report resting on nothing more than the absence of a standing crop does not support a declaration.",
              "That cuts both ways. An applicant whose land is genuinely being used agriculturally cannot expect a declaration to follow automatically from an application, and a neighbour or interested party challenging someone else's declaration has a real argument where the declaration rests on a thin inspection."
            ]
          },
          {
            id: "cancellation",
            heading: "Cancellation under Section 82",
            paras: [
              "A declaration once made is not beyond challenge. <strong>Section 82</strong> provides for cancellation of a declaration made under Section 80, and the section specifies the conditions on which that may be done.",
              "The Allahabad High Court has held that those conditions, having been clearly specified in the section itself, cannot be displaced by reference to other circumstances. An authority deciding a cancellation application has to address the statutory conditions, and cannot reject the application on grounds that sit outside them. A cancellation order that engages with extraneous considerations rather than the conditions Section 82 lays down is open to challenge on that basis.",
              "In practice this matters in two situations. The first is where a declaration has been obtained on an incorrect or incomplete footing and someone affected wants it undone. The second is where a landowner's own declaration is under attack and the attack rests on grounds the section does not contemplate. In both, the argument is fought on the statutory conditions, and framing it that way from the start is what makes the difference."
            ]
          },
          {
            id: "process",
            heading: "What the process involves",
            paras: [
              "A conversion matter is a documents exercise before it is anything else. The land has to be identified precisely, its recorded character established, its planning position checked, and the applicant's own entitlement to apply demonstrated. Most refusals and most delays trace back to one of those four being weak."
            ],
            list: [
              "Current khatauni and khasra for the gata, establishing the recorded character and the applicant's entitlement",
              "The chain of title, including the deed under which the applicant holds",
              "The plot's planning position: master plan land use, and whether it falls inside a development or industrial development authority area",
              "A site plan or map identifying the land and its boundaries",
              "The intended use, described with enough precision for the officer to decide",
              "Proof that land revenue and other dues on the holding are clear",
              "Where a building plan route applies, the plan and the authority's sanction"
            ],
            after: [
              "Fees and the exact prescribed forms change, and current figures should be taken from the tehsil or the development authority rather than from any secondary source, including this page. What does not change is the shape of the exercise: establish where the plot stands in the planning regime, then take the conversion route that matches it."
            ]
          },
          {
            id: "risks",
            heading: "The expensive mistakes",
            paras: [
              "<strong>Building first and converting later.</strong> This is the most common sequence and the worst one. Unauthorised non-agricultural use can attract action, the structure may not be regularisable, and a buyer's advocate will find the mismatch between the record and the reality immediately.",
              "<strong>Assuming a sale deed converted the land.</strong> It did not. A registered sale deed transfers the land in whatever character it had. If it was agricultural before, it is agricultural after.",
              "<strong>Treating conversion as planning permission.</strong> A declaration deals with the revenue record. What may be built is a planning question, governed by the master plan and the authority's sanction.",
              "<strong>Relying on a reported amendment without checking its operative status.</strong> The 2026 change is real and significant, but whether and how it applies to a particular plot depends on the plot's location and the notification as it stands when the application is made.",
              "<strong>Leaving the khatauni unamended after a successful declaration.</strong> The declaration has to be carried into the record for it to do its work. A declaration sitting in a file while the khatauni still shows agricultural land solves nothing for the next buyer."
            ]
          },
          {
            id: "buying",
            heading: "Buying land that is said to be converted",
            paras: [
              "A buyer being told that land is converted should treat that as a claim to be verified rather than a fact. The verification is straightforward and it is worth doing before any money moves.",
              "Ask for the declaration or the sanction itself, not a description of it. Read it against the gata numbers in the khatauni and confirm it covers the whole of the land being sold rather than part of it, which happens more often than people expect where a larger holding has been split. Check that the declared purpose matches what the buyer intends: a declaration for one non-agricultural use does not automatically authorise another. Then check that the change has actually been carried into the khatauni, because a declaration sitting in a file while the record still shows agricultural land will cause the next buyer, and the next bank, exactly the problem the present buyer is trying to avoid.",
              "Separately, establish the planning position. A plot can be lawfully non-agricultural in the revenue record and still be unbuildable for the intended purpose because the master plan designates the area for something else. Where the plot falls inside a development or industrial development authority area, the 2026 amendment means a sanctioned building plan carries the conversion with it, so the sanction is the document to ask for.",
              "Finally, confirm that no cancellation proceeding under Section 82 is pending against the declaration. A declaration under challenge is not the settled position the seller is presenting, and that is precisely the kind of thing the remarks column of the khatauni and the tehsil record will reveal if anyone looks."
            ]
          },

          {
            id: "lucknow",
            heading: "Conversion around Lucknow",
            paras: [
              "Lucknow is where this issue arises most sharply in the state, because the city has grown outward across land that was agricultural within living memory. The corridors along Sitapur Road, Hardoi Road, Kursi Road, Sultanpur Road and Faizabad Road contain a great deal of land that is built on, sold, mortgaged and occupied while still recorded as agricultural.",
              "The 2026 amendment is particularly relevant here, because much of that land now falls within the development authority's area, where a sanctioned building plan carries the conversion with it. For land outside the authority's limits &mdash; and there is a great deal of that in the surrounding districts &mdash; the Section 80 route remains the way through.",
              "The firm advises on which route applies to a particular plot, prepares and conducts the application, and acts in cancellation proceedings under Section 82. Matters relating to land in other districts of Uttar Pradesh are conducted from the Lucknow office before the authority having jurisdiction."
            ]
          }
        ],
        faqs: [
          [
            "Do I still need a separate conversion application in Lucknow?",
            "If the plot falls inside a development authority or industrial development authority area, the 2026 amendment treats approval of the building plan as the land-use conversion, which removes the separate application. If the plot is outside such an area, the declaration under Section 80 of the UP Revenue Code is still the route. Which applies depends on exactly where the plot lies, and that should be confirmed before anything is filed."
          ],
          [
            "I have built on my agricultural land already. What now?",
            "The land remains agricultural in the record until it is converted, and unauthorised non-agricultural use can attract action. What can be done depends on where the plot is, what has been built, and what the planning position permits. This is the situation in which the order of steps matters most, and it is worth taking advice on the documents before approaching anyone."
          ],
          [
            "Does a registered sale deed convert the land?",
            "No. A sale deed transfers the land in whatever character it had. Agricultural land sold by a registered deed is still agricultural land in the record. Conversion is a separate process and has to be done on its own footing."
          ],
          [
            "Can a declaration be cancelled after it is granted?",
            "Yes. Section 82 provides for cancellation of a Section 80 declaration on conditions the section itself specifies. The Allahabad High Court has held that those conditions cannot be displaced by reference to circumstances outside the section, so a cancellation proceeding is argued on the statutory conditions rather than on general objections."
          ],
          [
            "My land was inspected and found vacant, and conversion was refused. Is that a good reason?",
            "Vacancy by itself is not the test. The Allahabad High Court has held that agricultural land cannot be declared non-agricultural merely because the plot was found vacant, and the converse reasoning applies to a refusal resting on a thin inspection. What the order actually says is the starting point for any challenge, so obtain it in full."
          ]
        ],
        related: [
          ["Property Title Verification", "property-law-and-registration/property-title-verification-lucknow/index.html"],
          ["Agricultural Land Disputes", "property-law-and-registration/agricultural-land-dispute-lawyer-lucknow/index.html"],
          ["Revenue Court Matters", "property-law-and-registration/revenue-court-lawyer-lucknow/index.html"],
          ["Sale Deed Drafting and Registration", "property-law-and-registration/sale-deed-drafting-registration-lucknow/index.html"]
        ]
      },

      /* ============================================================ */
      {
        slug: "land-acquisition-compensation-lawyer-lucknow",
        navLabel: "Land Acquisition Compensation",
        name: "Land Acquisition Compensation Lawyer in Lucknow",
        h1: "Land Acquisition Compensation Lawyer in Lucknow",
        title: "Land Acquisition Compensation Lawyer in Lucknow | Enhanced Compensation",
        description:
          "Land acquisition compensation in Uttar Pradesh under the 2013 Act: how compensation is built from market value, multiplier and solatium, references against the award, lapse under Section 24 and appeals to the High Court.",
        lead:
          "How compensation is calculated under the 2013 Act, what to do when the award is too low, and when an old acquisition lapses altogether.",
        datePublished: "2026-10-29",
        dateModified: "2026-10-29",
        sections: [
          {
            id: "act",
            heading: "The Act that governs acquisition now",
            paras: [
              "Compulsory acquisition of land in India is governed by the <strong>Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013</strong>, which replaced the Land Acquisition Act of 1894. The change was not cosmetic. The 2013 Act altered how compensation is calculated, introduced a social impact assessment for many acquisitions, created rehabilitation and resettlement entitlements as a statutory matter rather than a policy one, and built in consent requirements for certain categories of acquisition.",
              "For a landowner, the practical significance is that compensation under the 2013 Act is substantially more generous than under the old law, and that the Act is prescriptive about how it is worked out. Compensation is not a figure an officer arrives at by impression. It is assembled from defined components, and an award that has not assembled them properly is open to challenge.",
              "A great deal of litigation still turns on acquisitions begun under the 1894 Act, because those proceedings were numerous and long-running. Where they stand now is governed by the transitional provisions, principally Section 24, and that has generated more Supreme Court authority than almost any other part of the statute."
            ]
          },
          {
            id: "components",
            heading: "How compensation is built",
            paras: [
              "Compensation under the 2013 Act starts from market value, determined under the Act's provisions by reference to the higher of the relevant indicators, including the registered sale prices in the area and the minimum land value where one is specified. To that is added the value of assets attached to the land &mdash; standing crops, trees, wells, structures &mdash; which are valued separately and not swallowed into the land figure.",
              "The market value is then multiplied by a factor set out in the Act's First Schedule. For rural land the multiplier runs on a range tied to the distance of the land from the nearest urban area; for urban land the factor is one. The product, together with the value of assets, forms the base on which a <strong>solatium of one hundred per cent</strong> is payable. Solatium is not a discretionary addition for hardship: it is a statutory component of the award.",
              "The structure explains why awards under the 2013 Act look so different from the 1894 Act figures that preceded them, and it also explains where awards go wrong. The commonest errors are an understated market value, assets valued at a nominal figure or omitted altogether, and the multiplier applied at the bottom of the range without any reasoning about the land's distance from the nearest urban centre."
            ],
            table: {
              caption: "The components of an award",
              head: ["Component", "What it covers", "Where disputes arise"],
              rows: [
                [
                  "Market value",
                  "The value of the land itself, determined under the Act's valuation provisions",
                  "Comparable sales chosen badly, or circle rates applied mechanically"
                ],
                [
                  "Value of assets attached to the land",
                  "Standing crops, trees, wells, structures and other attachments",
                  "Omitted entirely, or valued at a nominal figure"
                ],
                [
                  "Multiplier (First Schedule)",
                  "A factor applied to market value, on a range for rural land and one for urban land",
                  "Applied at the lowest point with no reasoning about distance"
                ],
                [
                  "Solatium",
                  "One hundred per cent of the sum of the above",
                  "Miscalculated where the base has been understated"
                ],
                [
                  "Rehabilitation and resettlement",
                  "Statutory entitlements under the Act's Schedules",
                  "Treated as discretionary, or not addressed at all"
                ]
              ]
            }
          },
          {
            id: "reference",
            heading: "When the award is too low",
            paras: [
              "An award is the Collector's determination; it is not the last word. A person interested who has not accepted the award can require the matter to be referred for determination of the compensation, and that reference is the principal route to enhancement. Accepting payment does not by itself close the door, provided the acceptance is made under protest in the manner the law requires &mdash; and that point is important enough that it should be settled before any money is received.",
              "What wins a reference is evidence of value, and that evidence has to be assembled rather than asserted. Registered sale instances from the same area and period, of genuinely comparable land, are the backbone. Evidence of the land's potential &mdash; its frontage, access, proximity to a road or a developed area, the use to which neighbouring land has been put &mdash; is what supports a case that the land was worth more than the awarding authority allowed.",
              "Beyond the reference, appeal lies to the High Court under the Act. The Supreme Court held in 2026, in a decision concerning a Special Land Acquisition Officer, that the Limitation Act applies to proceedings under the 2013 Act and that delay in filing such an appeal can be condoned. For claimants who lost time for reasons they can explain, that is a significant ruling."
            ]
          },
          {
            id: "lapse",
            heading: "Old acquisitions and lapse under Section 24",
            paras: [
              "Section 24 governs what happens to acquisitions begun under the 1894 Act. Its second sub-section is the one that has generated the litigation: where an award was made five years or more before the 2013 Act commenced, the proceedings lapse in certain circumstances, and the acquisition has to begin again under the new Act with its more generous compensation.",
              "The scope of that provision was settled by the Supreme Court's Constitution Bench in the Indore Development Authority line of cases, which read the word <em>or</em> in the provision as <em>and</em>. The practical effect is that lapse requires both limbs: neither possession taken nor compensation paid. An acquisition where the authority took possession, or where compensation was paid or tendered, does not lapse merely because the other limb is unsatisfied. That reading narrowed the provision considerably and disposed of a very large number of pending claims.",
              "A further decision in 2026 held that Section 24(1)(a) applies to all cases in which awards are passed after the commencement of the 2013 Act. For anyone holding an old file, the position is worth establishing precisely: what the award date was, whether possession was actually taken and when, and whether compensation was paid, tendered or deposited. Those three facts decide the question, and they are facts to be proved from the record rather than recalled."
            ]
          },
          {
            id: "documents",
            heading: "What a compensation matter is built from",
            paras: [
              "Acquisition matters are evidence-heavy and the evidence is specific. A claim for enhancement supported only by an assertion that the land was worth more will not succeed; a claim supported by comparable instances and a clear account of the land's character can succeed substantially."
            ],
            list: [
              "The notification and declaration, and the award itself in full",
              "Khatauni and khasra establishing the holding, the share and the character of the land",
              "Registered sale deeds of comparable land in the same area and period",
              "Evidence of the land's situation: access, frontage, road proximity, surrounding development",
              "Valuation material for trees, crops, wells and structures standing on the land",
              "Any record of possession &mdash; when it was taken, and by what process",
              "Proof of payment, tender or deposit of compensation, and of any protest made on acceptance",
              "Correspondence with the acquiring body and the Collector's office"
            ]
          },
          {
            id: "mistakes",
            heading: "What costs claimants money",
            paras: [
              "<strong>Accepting the award without protest.</strong> The manner of acceptance can affect what remains open afterwards, and the time to deal with it is before the money is received, not after.",
              "<strong>Letting the reference period run.</strong> Time limits in acquisition matters are real and unforgiving. A claimant who waits is arguing about delay before they ever reach the question of value.",
              "<strong>Producing no comparable instances.</strong> The single most effective piece of evidence in a reference is a registered sale of genuinely comparable land at a higher rate. Claims that do not produce them rarely move far.",
              "<strong>Ignoring assets on the land.</strong> Trees, wells, boundary walls and structures carry separate value, and awards routinely understate or omit them.",
              "<strong>Assuming an old acquisition has lapsed.</strong> After the Indore Development Authority line of cases, lapse requires both that possession was not taken and that compensation was not paid. Proceeding on the assumption that one limb suffices is how claimants lose years.",
              "<strong>Several co-sharers acting separately.</strong> Where a holding is jointly held, uncoordinated claims produce inconsistent evidence and weaken everybody's position."
            ]
          },
          {
            id: "rr",
            heading: "The entitlements people forget to claim",
            paras: [
              "Compensation for the land is the part everybody focuses on, and it is frequently not the whole of what the 2013 Act provides. The Act carries rehabilitation and resettlement entitlements in its Schedules, and those are statutory entitlements rather than discretionary assistance.",
              "They matter most to the people least likely to claim them. The Act's scheme extends beyond the recorded landowner to others whose livelihood depends on the land, and families displaced by an acquisition may be entitled to elements that an award focused solely on land value does not address at all. Where an award is silent on rehabilitation and resettlement, that silence is itself something to take up rather than to accept.",
              "There are also components of the land award that are routinely thin. Trees are valued by species, age and yield, not by count. A well, a boundary wall, a pump house, a cattle shed or a tube well installation each carries its own value, and awards frequently record a round figure for structures without any valuation behind it. Standing crops are valued as at the relevant date, and where possession was taken at a particular point in the season that matters.",
              "Interest and the statutory consequences of delayed payment form a further element, and in long-running acquisitions they can be substantial. The practical lesson is that an award should be read line by line against what was actually on the land, and every component that is absent or nominal should be identified before the reference is framed rather than afterwards."
            ]
          },

          {
            id: "lucknow",
            heading: "Acquisition matters around Lucknow",
            paras: [
              "Lucknow and the districts around it see acquisition for road and expressway projects, for development authority schemes, for industrial development, and for public infrastructure. Agricultural land on the city's periphery is the most commonly affected, and it is also the land where the gap between the awarded figure and the land's real value tends to be widest, because its character is changing faster than any valuation exercise reflects.",
              "The firm acts for landowners in reference proceedings for enhanced compensation, in matters concerning old acquisitions and the question of lapse, and in appeals. Matters relating to land in other districts of Uttar Pradesh are conducted from the Lucknow office before the forum having jurisdiction.",
              "No outcome is promised. What can be said, once the award and the record are seen, is what the award has allowed, what it appears to have missed, what evidence would be needed to establish a higher figure, and what the realistic stages of the matter are."
            ]
          }
        ],
        faqs: [
          [
            "Can I ask for more than the award gives me?",
            "Yes. An award is the Collector's determination, not a final adjudication of value. A person interested who has not accepted it can require a reference for determination of compensation, which is the principal route to enhancement. What decides it is evidence of value &mdash; comparable registered sales above all &mdash; rather than the assertion that the figure is low."
          ],
          [
            "If I take the compensation, do I lose the right to claim more?",
            "Not necessarily, but the manner of acceptance matters a great deal, and acceptance under protest in the manner the law requires is what preserves the position. This should be settled before any money is received, because it is far harder to deal with afterwards."
          ],
          [
            "My land was notified years ago and nothing happened. Has the acquisition lapsed?",
            "It depends on two facts: whether possession was taken and whether compensation was paid. Under the Supreme Court's Constitution Bench ruling in the Indore Development Authority line of cases, the provision requires both limbs &mdash; neither possession taken nor compensation paid &mdash; before an old acquisition lapses. Establishing those two facts from the record is the first step."
          ],
          [
            "How is the multiplier decided?",
            "The Act's First Schedule provides the factor. For rural land it runs on a range tied to the distance of the land from the nearest urban area; for urban land the factor is one. Awards frequently apply the bottom of the range without explaining the choice, and that is one of the points on which an award can be challenged."
          ],
          [
            "I missed the time limit for an appeal. Is there anything to be done?",
            "Possibly. The Supreme Court held in 2026 that the Limitation Act applies to proceedings under the 2013 Act and that delay in filing an appeal under the Act can be condoned. Condonation depends on explaining the delay, so the reasons and the dates are what matter, and they should be set out from the record rather than from memory."
          ]
        ],
        related: [
          ["Agricultural Land Disputes", "property-law-and-registration/agricultural-land-dispute-lawyer-lucknow/index.html"],
          ["Khatauni Correction", "property-law-and-registration/khatauni-correction-lawyer-lucknow/index.html"],
          ["Property Disputes", "property-law-and-registration/property-dispute-lawyer-lucknow/index.html"],
          ["Property Title Verification", "property-law-and-registration/property-title-verification-lucknow/index.html"]
        ]
      },

      /* ============================================================ */
      {
        slug: "revenue-court-lawyer-lucknow",
        navLabel: "Revenue Court Matters",
        name: "Revenue Court Lawyer in Lucknow",
        h1: "Revenue Court Lawyer in Lucknow",
        title: "Revenue Court Lawyer in Lucknow | UP Revenue Code Appeals and Revisions",
        description:
          "Revenue court practice in Uttar Pradesh: which officer decides what, appeals under Section 207 and the Third Schedule, revision under Section 210, transfer of cases and the civil court jurisdiction boundary.",
        lead:
          "Which officer decides what under the UP Revenue Code, how appeals and revisions work, and why choosing the forum correctly decides more matters than the merits do.",
        datePublished: "2026-10-29",
        dateModified: "2026-10-29",
        sections: [
          {
            id: "what",
            heading: "What a revenue court is",
            paras: [
              "Revenue courts are not a lesser species of civil court. They are a parallel system, created by statute, with their own jurisdiction, their own procedure and their own appellate structure. In Uttar Pradesh that system is built by the <strong>Uttar Pradesh Revenue Code, 2006</strong> and the Rules of 2016 made under it, and it handles the overwhelming majority of litigation about agricultural land in the state.",
              "The officers who staff it wear two hats. A Tehsildar, a Sub-Divisional Officer, a Collector and a Commissioner each have executive functions, and each also sits as a revenue court for defined purposes. When they are deciding a proceeding under the Code they are acting judicially, and their orders carry the consequences of judicial orders &mdash; which is why the route of challenge matters so much.",
              "For a landholder the practical question is rarely academic. It is: which officer decides my problem, what can I do if the decision is wrong, and how long do I have to do it. Those three answers shape the whole matter."
            ]
          },
          {
            id: "who",
            heading: "Who decides what",
            paras: [
              "First-instance work is distributed across the tehsil and sub-division according to the proceeding. Mutation work sits with the Tehsildar. Record correction under Section 38 begins with the Tahsildar, who makes an inquiry and refers the matter with a report, and is decided by the Collector or the Sub-Divisional Officer. Demarcation under Section 24 is dealt with at tehsil level. Proceedings concerning Gram Panchayat property under Section 67 are before the Assistant Collector. Division of a holding and ejectment proceedings have their own assigned forums.",
              "The Code also allows cases to be moved. Section 206(2) permits the Commissioner, the Collector or the Sub-Divisional Officer to transfer a case from their own file to a subordinate revenue officer, to withdraw a case from a subordinate, or to refer it to another competent officer. In a matter where the same set of facts has generated proceedings before more than one officer, that power is worth knowing about, because running parallel proceedings before different forums is a reliable way to produce inconsistent orders."
            ],
            table: {
              caption: "Common proceedings and where they begin",
              head: ["Proceeding", "Provision", "First instance"],
              rows: [
                [
                  "Mutation (dakhil kharij)",
                  "Sections 34&ndash;35",
                  "Tehsildar, after lekhpal verification"
                ],
                [
                  "Correction of the record",
                  "Section 38",
                  "Application to the Tahsildar; decided by the Collector or SDO"
                ],
                [
                  "Boundary demarcation",
                  "Section 24",
                  "Revenue authority at the tehsil"
                ],
                [
                  "Gram Panchayat property, eviction and damages",
                  "Section 67 with Rules 66&ndash;67",
                  "Assistant Collector"
                ],
                [
                  "Declaration of non-agricultural use",
                  "Section 80",
                  "The empowered revenue officer through the tehsil"
                ],
                [
                  "Appeal",
                  "Section 207 with the Third Schedule",
                  "The appellate authority the Schedule names"
                ],
                [
                  "Revision",
                  "Section 210",
                  "Commissioner or Board of Revenue"
                ]
              ]
            }
          },
          {
            id: "appeal",
            heading: "Appeals, and the Third Schedule that governs them",
            paras: [
              "Appeals under the Code are provided by <strong>Section 207</strong>, and the provision has to be read with the <strong>Third Schedule</strong>. The Schedule lists the orders against which an appeal lies and names the authority to which it goes. That is not a technicality to be checked afterwards &mdash; it is the first thing to establish, because an order not listed in the Schedule carries no appeal at all.",
              "The Allahabad High Court has applied that reasoning directly. Reading Section 207 with the Third Schedule, it held that no appeal lies against an interim injunction order passed in a suit under Section 116, because applications of that kind are not listed in the Schedule. The remedy in that situation was revision under Section 210 against the Sub-Divisional Officer's order.",
              "The lesson is practical. When an adverse order arrives, the question is not <em>can I appeal</em> but <em>is this order in the Third Schedule</em>. If it is, the appeal is the route. If it is not, an appeal will be dismissed as not maintainable and the time spent on it may have cost the revision as well."
            ]
          },
          {
            id: "revision",
            heading: "Revision under Section 210",
            paras: [
              "Revision lies to the Commissioner or the Board of Revenue under Section 210, and the High Court has given that power a notably broad reading in recent years.",
              "It held that a revision under Section 210 lies against a final order passed by the Commissioner in an appeal under Section 207, reading the words <em>proceeding decided</em> as wide enough to include the Commissioner's own final appellate order. It held that the revisional court can correct an order of a subordinate revenue court at any stage of a suit or proceeding, even where the order does not finally dispose of the matter &mdash; so interlocutory orders are within reach. And it held that where an appellate order under Section 35(2) carries no further appeal, that does not exclude the Commissioner's revisional jurisdiction; the absence of a further appeal is not an indication that the legislature meant to limit revision.",
              "The Court described the jurisdiction in terms worth remembering: it is a duty as much as a power, which the Board or the Commissioner must discharge so that subordinate revenue courts act in accordance with law. Section 210 was also amended in 2016, renumbering the provision and removing the words that covered cases where an appeal lay but had not been preferred.",
              "For a litigant, the significance is that an order which looks unchallengeable often is not. Where no appeal lies, revision frequently does."
            ]
          },
          {
            id: "civil",
            heading: "The boundary with the civil court",
            paras: [
              "A great deal of wasted litigation comes from filing in the wrong system. The Code reserves defined questions about agricultural land to revenue courts, and where it does, a civil court cannot decide them. Questions that are genuinely about the validity of an instrument, specific performance of an agreement, or cancellation of a deed often remain civil, unless the Code bars them.",
              "The honest answer in many matters is that both systems have a part, in sequence: a civil proceeding to establish or undo a right, and a revenue proceeding to bring the record into line with the result. Running them in the wrong order, or running only one when both were needed, is how people end up with a decree they cannot give effect to.",
              "Establishing the division on the documents before anything is filed is therefore the most valuable work in a revenue matter, and it is work that has to be done on the papers rather than on a description of them."
            ]
          },
          {
            id: "practice",
            heading: "What revenue practice actually demands",
            paras: [
              "Revenue proceedings reward preparation of a particular kind. They are document-driven, the documents are historic, and the officer deciding has a heavy file and limited time. A case that presents its sequence clearly &mdash; what the record said, what changed, which order explains the change, why that order cannot stand &mdash; is at a considerable advantage over one that asserts a conclusion.",
              "Several practical things decide outcomes more often than argument does."
            ],
            list: [
              "Obtain the order, not merely the entry it produced &mdash; the remedy depends on what the order was",
              "Check the Third Schedule before deciding whether to appeal or to seek revision",
              "Serve everyone affected; proceedings conducted without necessary parties are undone later",
              "Watch the time limits, which are real and are the first thing the other side will raise",
              "Produce the historic record, not just the current khatauni",
              "Where interim protection is needed, ask for it at once and on the documents available now",
              "Keep parallel proceedings under control, and consider the transfer power in Section 206(2)"
            ]
          },
          {
            id: "limitation",
            heading: "Time, and the orders people do not see",
            paras: [
              "Time limits decide a surprising proportion of revenue matters, and they do so quietly. A party who has a good case on the merits but who filed late spends the proceeding arguing about delay, and the merits may never be reached.",
              "Two situations account for most of the damage. The first is the party who treats an adverse order as something to think about, and returns to it weeks later. The second, and more common in revenue practice, is the party who never saw the order at all. Mutation and correction proceedings are frequently decided on notice that was served in a way the affected person did not actually receive, and the first they know of it is when a subsequent transaction fails. The date of knowledge then becomes a live issue, and it is an issue to be proved rather than asserted.",
              "That is why obtaining a certified copy of the order is the first step in every challenge, not a formality to be attended to later. The copy establishes what was decided, by whom and when, and the dates on it determine which remedy remains open. Where knowledge came late, the circumstances of that should be recorded while they are fresh, because explaining a delay two years afterwards from memory is considerably harder than doing it from a contemporaneous account."
            ],
            after: [
              "There is a related discipline worth adopting for anyone holding agricultural land they do not personally cultivate: read the khatauni periodically rather than when a transaction is pending. Entries change, proceedings are started, and orders are passed about land whose holder is living elsewhere. An entry noticed within a season is an ordinary problem. The same entry noticed after five years has become an expensive one."
            ]
          },

          {
            id: "lucknow",
            heading: "Revenue court practice from Lucknow",
            paras: [
              "The firm conducts revenue matters before the Tehsildar, the Sub-Divisional Officer, the Collector, the Commissioner and the Board of Revenue, and related proceedings before the Allahabad High Court's Lucknow Bench where a matter reaches that stage.",
              "Revenue jurisdiction follows the land rather than the parties, so a holding in another district is dealt with before the officers having jurisdiction there, conducted from the Lucknow office. Where personal attendance is required for a particular stage &mdash; a measurement, a recording of evidence, an identification &mdash; that is arranged for that stage rather than assumed throughout.",
              "No outcome is promised in any matter. What can be given, once the orders and the record are seen, is an account of which forum the matter belongs in, what the available remedy actually is, and the stages a matter of that kind passes through."
            ]
          }
        ],
        faqs: [
          [
            "Can I appeal any revenue court order?",
            "No. Appeals lie under Section 207 read with the Third Schedule, and the Schedule lists which orders are appealable and to whom. An order not listed carries no appeal. The Allahabad High Court has held, for example, that no appeal lies against an interim injunction order in a Section 116 suit, because such applications are not in the Schedule &mdash; revision was the remedy there."
          ],
          [
            "There is no appeal against my order. Is that the end of it?",
            "Often not. Revision under Section 210 lies to the Commissioner or the Board of Revenue, and the High Court has read that power broadly: it reaches final appellate orders of the Commissioner, it extends to interlocutory orders, and the absence of a further appeal does not exclude it. An order that looks unchallengeable frequently is not."
          ],
          [
            "Should my land dispute go to the civil court or the revenue court?",
            "It depends on the question being asked. The Code reserves defined questions about agricultural land to revenue courts; questions genuinely about the validity of a deed or enforcement of a contract are often civil. Many matters need both in sequence. This should be settled on the documents before anything is filed, because a decree from a court without jurisdiction does not help."
          ],
          [
            "Two proceedings about the same land are running before different officers. What can be done?",
            "Section 206(2) allows the Commissioner, the Collector or the Sub-Divisional Officer to transfer a case from their own file to a subordinate officer, to withdraw a case, or to refer it to another competent officer. Where parallel proceedings risk inconsistent orders, that power is worth invoking rather than letting both run."
          ],
          [
            "How long do revenue matters take?",
            "That depends on the proceeding, the forum, the number of parties and how much evidence has to be recorded, and any period given in the abstract would be a guess. What can be given once the papers are seen is an account of the stages a matter of that kind passes through and what can be done at each."
          ]
        ],
        related: [
          ["Agricultural Land Disputes", "property-law-and-registration/agricultural-land-dispute-lawyer-lucknow/index.html"],
          ["Khatauni Correction", "property-law-and-registration/khatauni-correction-lawyer-lucknow/index.html"],
          ["Land Demarcation", "property-law-and-registration/land-demarcation-lawyer-lucknow/index.html"],
          ["Property Disputes", "property-law-and-registration/property-dispute-lawyer-lucknow/index.html"]
        ]
      },

      /* ============================================================ */
      {
        slug: "chakbandi-lawyer-lucknow",
        navLabel: "Chakbandi (Consolidation)",
        name: "Chakbandi Lawyer in Lucknow",
        h1: "Chakbandi Lawyer in Lucknow",
        title: "Chakbandi Lawyer in Lucknow | UP Consolidation of Holdings Act",
        description:
          "Chakbandi in Uttar Pradesh: how consolidation proceedings run under the UP Consolidation of Holdings Act 1953, objections under Section 9, chak allotment under Section 20, appeals and revision under Section 48.",
        lead:
          "How consolidation redraws a village, the stages at which objections must be taken, and why a chak that has attained finality is so difficult to disturb afterwards.",
        datePublished: "2026-10-29",
        dateModified: "2026-10-29",
        sections: [
          {
            id: "what",
            heading: "What chakbandi does to a village",
            paras: [
              "Consolidation of holdings &mdash; <em>chakbandi</em> &mdash; is the process by which the scattered plots of a village are pooled and redistributed so that each tenure holder receives their entitlement in consolidated blocks, called chaks, instead of in a dozen fragments spread across the revenue area. It is carried out under the <strong>Uttar Pradesh Consolidation of Holdings Act, 1953</strong>.",
              "The reason for it is straightforward agricultural economics: fragmented holdings are inefficient to cultivate, expensive to irrigate and almost impossible to mechanise. The consequence for landholders, though, is dramatic. Consolidation does not merely tidy the record; it reallocates land. The field a family cultivated for three generations may become someone else's chak, and their entitlement may be satisfied somewhere else in the village.",
              "That is why consolidation proceedings matter so much and why the objection stages are not optional. A tenure holder who does not engage with the process at the right moment may find their entitlement determined, their chak allotted and the whole exercise closed, with very limited room to reopen it afterwards."
            ]
          },
          {
            id: "stages",
            heading: "The stages, and where objections belong",
            paras: [
              "Consolidation runs in defined stages, and each stage has its own window for objection. Missing the window is the single most common reason people lose ground in chakbandi, because the later stages build on what the earlier ones settled.",
              "The process begins with notification of the village for consolidation. The existing rights are then recorded and the record is published. Objections to that record are filed under <strong>Section 9</strong>, and this is the critical stage for anyone whose recorded rights, shares or possession are wrong &mdash; it is the point at which the record that everything else will be built on is fixed. Objections under Section 9-A and appeals under Section 11(1) carry the matter further, with spot inspections frequently ordered where possession is in issue.",
              "Once rights are settled, valuation and the statement of proposals follow, and then chaks are allotted. Allotment is where the second round of grievance arises: not about what a person is entitled to, but about where it has been given to them &mdash; whether the chak is on their original holding, whether it has road or irrigation access, whether its quality matches what was taken.",
              "Finally the operations are closed and the village is denotified, and the new record becomes the operative one."
            ],
            table: {
              caption: "Stages of consolidation and the remedy at each",
              head: ["Stage", "What is settled", "Where to object"],
              rows: [
                [
                  "Publication of the record of rights",
                  "Who holds what, in what share",
                  "Objections under Section 9, then Section 9-A"
                ],
                [
                  "Appeal on rights",
                  "The outcome of the rights objections",
                  "Appeal under Section 11(1), often with a spot inspection"
                ],
                [
                  "Valuation and proposals",
                  "What each holding is worth for the exchange",
                  "Objections at the valuation stage"
                ],
                [
                  "Allotment of chaks",
                  "Where each holder's consolidated block falls",
                  "Objections on allotment; changes only as Sections 20 and 21 allow"
                ],
                [
                  "Revision and reference",
                  "Correction of orders below",
                  "Deputy Director of Consolidation under Section 48"
                ],
                [
                  "Closure of operations",
                  "The new record becomes operative",
                  "Very limited scope to reopen"
                ]
              ]
            }
          },
          {
            id: "finality",
            heading: "Finality, and why it is taken seriously",
            paras: [
              "The courts treat the finality of a chak with real firmness, and for a structural reason: a village's consolidation is an interlocking scheme. Moving one person's chak means moving someone else's, and if allotments could be reopened freely the whole exercise would unravel.",
              "The Allahabad High Court put the position plainly in a 2024 decision: there is no provision in the law to change the chak of a tenure holder which has attained finality before the completion of the consolidation operation, except as provided under <strong>Sections 20 and 21</strong> of the Act. In that case the Court quashed a reference order and remanded the matter.",
              "What follows from that is a hard practical rule. Objections have to be taken at the stage to which they belong. A grievance about recorded rights raised for the first time after chaks have been allotted is in serious difficulty; a grievance about allotment raised after operations have closed is in worse difficulty still. The cost of engaging early is small. The cost of engaging late is frequently the land."
            ]
          },
          {
            id: "section48",
            heading: "Revision and reference under Section 48",
            paras: [
              "<strong>Section 48</strong> gives the Deputy Director of Consolidation revisional authority over orders passed in consolidation proceedings, and it is the principal corrective mechanism within the system. The Allahabad High Court has recognised that the Deputy Director has authority to modify chak allotments under Section 48, and a reference may be made under Section 48(3).",
              "That power is wide but it is not unlimited, and the 2024 decision referred to above is the illustration: a reference order that disturbed a chak which had attained finality, otherwise than as Sections 20 and 21 permit, was quashed. The revisional authority operates within the scheme, not above it.",
              "For a litigant, the two points that matter are these. First, Section 48 is often the available route when an order below is wrong, and it reaches allotment as well as rights. Second, invoking it successfully means showing not merely that a different allotment would have been fairer, but that the order under challenge is one the authority can properly interfere with."
            ]
          },
          {
            id: "jurisdiction",
            heading: "What happens to other proceedings during consolidation",
            paras: [
              "Once a village is notified for consolidation, the Act channels disputes about the land into the consolidation machinery, and proceedings pending elsewhere about rights in that land are affected. This is a frequent source of confusion, because a party with a suit running in another forum may find that it cannot proceed, or that it abates and must be pursued within the consolidation proceedings instead.",
              "The practical consequence is that anyone with a live dispute about land in a village that has been notified needs to establish immediately what happens to their existing proceeding and what has to be filed in the consolidation forum to preserve the claim. Doing nothing because a case is already pending somewhere is how claims are lost.",
              "When operations close and the village is denotified, the position reverts, and the consolidated record becomes the record that governs. Disputes after that point are ordinary revenue or civil matters, decided on the new record."
            ]
          },
          {
            id: "documents",
            heading: "What a chakbandi matter needs",
            paras: [
              "Consolidation files are bulky and the documents are specific to the process. Bringing the right ones to a first discussion makes a substantial difference, because the stage a matter has reached determines what can still be done about it."
            ],
            list: [
              "The notification for the village, and the dates of the stages so far",
              "The published record of rights, and any objection already filed under Section 9 or 9-A",
              "Orders passed at each stage, including appellate orders under Section 11(1)",
              "The valuation statement and the statement of proposals",
              "The chak allotment order and the chak map",
              "Pre-consolidation khatauni and khasra, showing the original holding",
              "Any order under Section 48, and any reference made",
              "Details of any proceeding about the same land pending in another forum"
            ]
          },
          {
            id: "mistakes",
            heading: "Where people lose ground",
            paras: [
              "<strong>Treating the Section 9 stage as a formality.</strong> This is the stage at which rights are fixed. Everything afterwards is built on it, and a wrong entry allowed to pass here is very expensive to undo later.",
              "<strong>Complaining about allotment when the real grievance is about rights.</strong> If the share recorded was wrong, objecting to the chak does not fix it; the complaint belongs at the rights stage and has to be framed accordingly.",
              "<strong>Assuming a pending case elsewhere protects the position.</strong> Once a village is notified, a proceeding in another forum may not survive, and a claim not brought into the consolidation machinery may simply not be considered.",
              "<strong>Ignoring quality and access.</strong> An allotment of the correct area in the wrong place &mdash; without road access, without irrigation, on inferior land &mdash; satisfies the arithmetic and not much else. Those are proper grounds for objection at the allotment stage and very hard to raise afterwards.",
              "<strong>Waiting until operations close.</strong> After closure the scope to reopen is narrow, and the 2024 ruling on finality shows how firmly that is enforced."
            ]
          },
          {
            id: "after",
            heading: "After consolidation: living with the new record",
            paras: [
              "When operations close, the consolidated record becomes the operative record, and that has consequences people are often unprepared for.",
              "The first is that the old gata numbers largely cease to be useful. Deeds, family papers and older khatauni extracts refer to plots that no longer exist as such, and establishing what a pre-consolidation document corresponds to in the new record requires the consolidation material itself. Families who kept the chak allotment order and the chak map are in a very much better position than those who did not, and those documents should be preserved with the title deeds rather than treated as process paperwork.",
              "The second is that informal arrangements do not survive the process intact. Where brothers had divided land among themselves without any document, consolidation allots chaks against recorded shares, and what emerges may not reflect the arrangement the family was actually living by. The time to deal with that is during the proceedings, by getting the record right at the rights stage, not afterwards by argument about what everyone understood.",
              "The third is that the new record is where every later question starts: mutation, sale, partition, acquisition compensation and mortgage all proceed from it. A chak allotted without road access or with an area that does not tally is a problem that will present itself again at each of those moments, which is why the allotment stage repays attention that it rarely gets."
            ]
          },

          {
            id: "lucknow",
            heading: "Consolidation work from Lucknow",
            paras: [
              "Consolidation matters are conducted before the Consolidation Officer, the Settlement Officer Consolidation and the Deputy Director of Consolidation having jurisdiction over the village, with related proceedings before the Allahabad High Court's Lucknow Bench where a matter reaches that stage.",
              "Because consolidation follows the village rather than the parties, families who have moved to Lucknow or further afield frequently need representation in a district they no longer live in. Those matters are conducted from the Lucknow office before the authorities having jurisdiction, with attendance arranged for the stages that require it &mdash; a spot inspection in particular, where presence counts for a great deal.",
              "No outcome is promised. What can be given, once the stage and the orders are known, is an account of what remains open, what has closed, and what has to be done now rather than later."
            ]
          }
        ],
        faqs: [
          [
            "Can my chak be changed after it has been allotted?",
            "Only within narrow limits. The Allahabad High Court held in 2024 that there is no provision to change a chak which has attained finality before completion of the consolidation operation, except as Sections 20 and 21 of the Act provide. Objections to allotment therefore belong at the allotment stage, and raising them afterwards is very difficult."
          ],
          [
            "My share is recorded wrongly. When do I object?",
            "At the Section 9 stage, when the record of rights is published, and if necessary through Section 9-A and an appeal under Section 11(1). That is the stage at which rights are fixed, and the valuation and allotment that follow are built on it. A rights grievance raised after chaks have been allotted is in serious difficulty."
          ],
          [
            "I have a case pending in another court about this land and the village has now been notified for consolidation. What happens?",
            "The Act channels disputes about rights in the land into the consolidation machinery once a village is notified, and a proceeding pending elsewhere may not survive. What has to be done to preserve the claim within the consolidation proceedings should be established immediately, because doing nothing on the footing that a case is already pending is how claims are lost."
          ],
          [
            "What is Section 48 and when is it used?",
            "Section 48 gives the Deputy Director of Consolidation revisional authority over orders in consolidation proceedings, including the power to modify chak allotments, and a reference may be made under Section 48(3). It is the principal corrective route within the system, but it operates within the scheme: a reference that disturbs a chak which has attained finality, otherwise than Sections 20 and 21 permit, can itself be quashed."
          ],
          [
            "My chak is the right size but it has no road access. Is that a valid objection?",
            "It is a proper ground to raise at the allotment stage. An allotment that matches on area but not on access, irrigation or quality does not give the holder what the exchange was meant to give them. Raised at the right stage it is a real argument; raised after closure it is a very difficult one."
          ]
        ],
        related: [
          ["Agricultural Land Disputes", "property-law-and-registration/agricultural-land-dispute-lawyer-lucknow/index.html"],
          ["Land Demarcation", "property-law-and-registration/land-demarcation-lawyer-lucknow/index.html"],
          ["Khatauni Correction", "property-law-and-registration/khatauni-correction-lawyer-lucknow/index.html"],
          ["Revenue Court Matters", "property-law-and-registration/revenue-court-lawyer-lucknow/index.html"]
        ]
      },

      /* ============================================================ */
      {
        slug: "gram-sabha-land-dispute-lawyer-lucknow",
        navLabel: "Gram Sabha Land Disputes",
        name: "Gram Sabha Land Dispute Lawyer in Lucknow",
        h1: "Gram Sabha Land Dispute Lawyer in Lucknow",
        title: "Gram Sabha Land Dispute Lawyer in Lucknow | Section 67 Eviction",
        description:
          "Gram Sabha land disputes in Uttar Pradesh: Section 67 proceedings, R.C. Form 20 notices, summary procedure on affidavits, eviction and damages, and the remedies available to a person facing eviction.",
        lead:
          "How proceedings over Gram Panchayat land work under Section 67 of the UP Revenue Code, why they move faster than ordinary litigation, and what can be done when a notice arrives.",
        datePublished: "2026-10-29",
        dateModified: "2026-10-29",
        sections: [
          {
            id: "what",
            heading: "What Gram Sabha land is",
            paras: [
              "A substantial part of every village in Uttar Pradesh is not private land at all. Ponds, grazing land, cremation grounds, village paths, chak roads, school land and common land vest in the Gram Panchayat or are held for the benefit of the village community. These are recorded in the khatauni under their own categories, and they are not transferable to a private person.",
              "Encroachment on such land is extremely common and usually incremental. A boundary is extended by a furrow each season. A pond silts up and is cultivated. A path narrows until it disappears. A structure goes up on land nobody appears to be using. Years later the land is being farmed, built on or sold as though it were private property, and often by people who genuinely believe it is theirs because their family has used it for decades.",
              "<strong>Section 67 of the Uttar Pradesh Revenue Code, 2006</strong>, read with Rules 66 and 67 of the Uttar Pradesh Revenue Code Rules, 2016, is the machinery for dealing with this: prevention of damage, misappropriation and wrongful occupation of Gram Panchayat property, and restoration of possession."
            ]
          },
          {
            id: "procedure",
            heading: "How a Section 67 proceeding runs",
            paras: [
              "The proceeding is before the Assistant Collector. On the matter being brought to notice, a show-cause notice issues in <strong>R.C. Form 20</strong>, calling on the person concerned to show cause why an order of eviction should not be passed and why damages should not be imposed. The report that sets the process in motion is made by the Pradhan or the Lekhpal in R.C. Form 19.",
              "What follows is not an ordinary trial. Proceedings under Section 67 are expressly summary, and the Allahabad High Court has confirmed that they are to be decided primarily on affidavits, in terms of Section 225-A of the Code. Where the occupation is established, the Assistant Collector may order eviction and may order recovery of compensation, which is recoverable as arrears of land revenue. Sub-section (3) permits eviction by use of such force as may be necessary.",
              "The Court has also held that because the proceedings are summary, the long procedure of Order XXI of the Code of Civil Procedure should not be followed for execution of an eviction order. That removes a route that would otherwise have given occupiers considerable additional time.",
              "The High Court has, in addition, pressed the administration on timelines: directions have been issued that the Pradhan or Lekhpal inform the Tahsildar of an encroachment within sixty days, through R.C. Form 19, and that Section 67 proceedings be completed within ninety days of the show-cause notice. Those directions come from reported judgments rather than from the statute, and their current operation should be checked, but the direction of travel is unmistakable &mdash; these matters are expected to move quickly."
            ],
            table: {
              caption: "The shape of a Section 67 proceeding",
              head: ["Step", "What happens", "Form or provision"],
              rows: [
                [
                  "Report of encroachment",
                  "Pradhan or Lekhpal informs the Tahsildar",
                  "R.C. Form 19"
                ],
                [
                  "Show-cause notice",
                  "Occupier called on to show cause against eviction and damages",
                  "R.C. Form 20, under Section 67(2)"
                ],
                [
                  "Hearing",
                  "Summary proceeding, decided primarily on affidavits",
                  "Section 67 with Section 225-A"
                ],
                [
                  "Order",
                  "Eviction, and compensation where ordered",
                  "Section 67"
                ],
                [
                  "Execution",
                  "Eviction, with such force as necessary; Order XXI CPC not followed",
                  "Section 67(3)"
                ],
                [
                  "Recovery of damages",
                  "Compensation recovered as arrears of land revenue",
                  "Section 67"
                ]
              ]
            }
          },
          {
            id: "defending",
            heading: "If a notice arrives",
            paras: [
              "The first thing to understand about a Form 20 notice is that the clock is short and the procedure is summary. There will not be the drawn-out sequence of a civil suit, the matter will largely be decided on affidavits, and an order once made is enforceable without the protections of Order XXI. Treating the notice as something to deal with later is the most damaging response available.",
              "The second thing is that the real question is almost always about the record. Section 67 applies to Gram Panchayat property. If the land is not in fact Gram Panchayat property &mdash; if it is recorded in the name of the person occupying it, or if an entry showing it as public land was itself made without an order &mdash; then the foundation of the proceeding is in issue, and that is the point on which a defence is built.",
              "Several defences arise in practice, and which is available depends entirely on the record and the history."
            ],
            list: [
              "The land is not Gram Panchayat property at all, on the record properly read",
              "The entry classifying it as public land was made without any order of a competent authority",
              "The occupier holds under a lawful allotment or settlement, and the papers for it exist",
              "The person proceeded against is not the person in occupation",
              "The notice does not identify the land with the precision the proceeding requires",
              "Rights were acquired or regularised under a provision that applies to the land",
              "Damages have been assessed without material connecting this person to the occupation"
            ],
            after: [
              "That last point is not theoretical. In a 2026 decision the Allahabad High Court upheld an eviction from Gram Sabha land but set aside the accompanying penalty order, holding that there was no material to link the petitioners to either the construction or the occupation. Eviction and damages are separate determinations, and the second needs its own evidence."
            ]
          },
          {
            id: "guidelines",
            heading: "Guidelines, and what they do not do",
            paras: [
              "Courts have at various times issued guidelines intended to regulate how these proceedings are conducted, and occupiers frequently rely on them. In a 2026 ruling the Allahabad High Court addressed that directly, holding that the guidelines issued in <em>Rishipal Singh v. State of U.P.</em> are recommendatory and cannot override the statutory summary procedure under Section 67.",
              "The practical significance is considerable. A defence built principally on a failure to follow judicially suggested guidance, rather than on the statutory requirements or on the record, is a weak defence. What the statute and the Rules require &mdash; proper notice, identification of the land, a determination that the land is Gram Panchayat property, material supporting any damages &mdash; is what carries weight.",
              "Encroachment on public land can also attract action beyond the Code. Proceedings under Section 67 may be accompanied by criminal action, including under the law concerning damage to public property, which is a further reason not to treat a notice as a routine revenue matter."
            ]
          },
          {
            id: "panchayat",
            heading: "From the Gram Panchayat's side",
            paras: [
              "The Section 67 machinery exists because village common land disappears quietly, and because the people who lose by it &mdash; the whole village &mdash; have no individual incentive to litigate about it. The Allahabad High Court has taken a notably firm line on administrative inaction, pressing Pradhans, Lekhpals and Tahsildars on their failure to act on encroachments and setting out the timelines mentioned above.",
              "For a Gram Panchayat seeking to recover land, the work is evidential and procedural rather than argumentative. The classification of the land has to be established from the record, the extent and location of the encroachment identified with precision, the correct person proceeded against, and the damages supported by material. Proceedings that fail usually fail on one of those four, not on the law.",
              "Where land has already been built upon, the position is harder in practice than in principle, and the sequence in which steps are taken matters a great deal."
            ]
          },
          {
            id: "remedies",
            heading: "Challenging an order",
            paras: [
              "An order under Section 67 is a revenue court order and the Code's ordinary remedies apply to it. Appeal lies under Section 207 read with the Third Schedule, which lists what is appealable and names the authority. Revision lies under Section 210 to the Commissioner or the Board of Revenue, and the High Court has given that provision a broad reading, holding that it reaches final appellate orders and interlocutory orders alike.",
              "Writ petitions are frequently filed in these matters and frequently declined, because the Code provides remedies and the High Court expects them to be used. Going to the writ court first usually costs time without gaining anything, unless there is something exceptional about the case.",
              "Because the proceedings move quickly and execution is not slowed by Order XXI, the sequence of steps after an adverse order is important. Obtaining the order itself, establishing precisely what it decided and on what material, and filing the correct remedy promptly is what preserves the position."
            ]
          },
          {
            id: "classification",
            heading: "How land comes to be recorded as public land",
            paras: [
              "Understanding where the classification came from is usually the key to a Section 67 matter, because the proceeding stands or falls on whether the land really is Gram Panchayat property.",
              "Most such entries originate in the settlement and consolidation records, where land not held by any tenure holder was recorded under categories reserved for ponds, paths, grazing land, burial and cremation grounds, schools and other common purposes. Those entries have generally carried forward through successive records, which is why the classification can usually be traced back a long way if the historic khatauni is obtained.",
              "Problems arise where the entry does not have that pedigree. An entry may have been made at some later point without any order behind it, or land genuinely allotted to an individual under a scheme may still be carried in the record under its old classification, or the area recorded as public land may not correspond to what is on the ground. Each of those is a record question, and each is answered by obtaining the historic khatauni and the order, if any, that produced the present entry.",
              "The same exercise matters to a Gram Panchayat seeking to recover land, from the other side. A Section 67 proceeding founded on a current entry alone, without the history that supports it, is weaker than one that can show the classification running back through the settlement record. In both directions the work is the same: find out what the record said, when it changed, and what order explains the change."
            ]
          },

          {
            id: "lucknow",
            heading: "These matters around Lucknow",
            paras: [
              "Villages on the edge of Lucknow see this issue in its sharpest form, because land that was common land in a farming village becomes extremely valuable once the city reaches it. Ponds, paths and grazing land in the urbanising belt around the city are encroached, built upon and sometimes sold on, and the resulting proceedings affect people who bought in good faith from someone who had no right to sell.",
              "That last category deserves a specific warning. Gram Sabha land is not transferable to a private person, and a registered sale deed does not cure that. A purchaser who did not check the classification in the khatauni before paying may find that what they bought cannot be held, and that their remedy is against their seller rather than against the proceeding.",
              "The firm acts both for persons facing proceedings under Section 67 and in matters concerning the classification of land in the record. Matters relating to land in other districts of Uttar Pradesh are conducted from the Lucknow office before the authority having jurisdiction. No outcome is promised; what can be given, once the notice and the record are seen, is an account of what the proceeding is, what the record actually shows and what remains open."
            ]
          }
        ],
        faqs: [
          [
            "I have received a Form 20 notice. How much time do I have?",
            "Less than you would have in ordinary litigation. Section 67 proceedings are summary, they are decided primarily on affidavits under Section 225-A, and the High Court has directed that they be completed within ninety days of the show-cause notice. Execution is not slowed by Order XXI of the CPC either. The notice should be acted on at once, with the record obtained immediately."
          ],
          [
            "My family has cultivated this land for forty years. Does that help?",
            "Long use does not convert Gram Panchayat property into private land, and the fact of long cultivation is not by itself an answer to a Section 67 proceeding. What can matter is whether the land is in fact Gram Panchayat property on the record properly read, and whether any lawful allotment, settlement or regularisation applies. Those are record questions, and the record is where a defence starts."
          ],
          [
            "I bought this land with a registered sale deed. Can I still be evicted?",
            "Yes. Gram Sabha land is not transferable to a private person, and registration of a deed does not cure a transfer the law does not permit. A purchaser in that position usually has a remedy against the seller rather than a defence to the proceeding, which is why the classification in the khatauni should be checked before any rural land is paid for."
          ],
          [
            "Eviction was ordered and damages were imposed. Are they decided together?",
            "They are separate determinations. In a 2026 decision the Allahabad High Court upheld an eviction from Gram Sabha land but set aside the penalty order, because there was no material linking the petitioners to the construction or the occupation. A damages order that rests on no material connecting you to the occupation can be challenged independently of the eviction."
          ],
          [
            "Can I go straight to the High Court?",
            "You can file, but the Code provides an appeal under Section 207 read with the Third Schedule and a revision under Section 210, and the High Court regularly declines to interfere where those remedies exist. Given how quickly these proceedings move, time spent in the wrong forum is particularly costly here."
          ]
        ],
        related: [
          ["Agricultural Land Disputes", "property-law-and-registration/agricultural-land-dispute-lawyer-lucknow/index.html"],
          ["Khatauni Correction", "property-law-and-registration/khatauni-correction-lawyer-lucknow/index.html"],
          ["Revenue Court Matters", "property-law-and-registration/revenue-court-lawyer-lucknow/index.html"],
          ["Property Title Verification", "property-law-and-registration/property-title-verification-lucknow/index.html"]
        ]
      }

    ]
  }
];
