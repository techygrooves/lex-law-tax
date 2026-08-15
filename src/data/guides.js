/*
 * Legal guides
 * ------------
 * One object per guide article. The page builder reads this file and
 * nothing else for the guide pages, so an article is edited here rather
 * than in markup.
 *
 * ---------------------------------------------------------------------
 * WHAT MAY NOT BE WRITTEN HERE
 * ---------------------------------------------------------------------
 * These notes are published for general information by a firm of
 * advocates, and the Bar Council of India's rules on advertising apply to
 * every word. Nothing in this file may state:
 *
 *   - a decided case, a judgment or a citation;
 *   - a quotation from a statute;
 *   - a government fee, court fee, stamp duty rate or registration charge;
 *   - a tax rate, threshold, slab or penalty amount;
 *   - a limitation period, notice period, due date or deadline, in days,
 *     weeks, months or years;
 *   - a processing time, or how a government portal behaves;
 *   - an assurance about the outcome of any proceeding.
 *
 * A provision may be named where that is how practitioners identify it
 * (for example, section 138 of the Negotiable Instruments Act, 1881).
 * The period it prescribes may be described as a period the statute
 * fixes. It may never be given a number here, because a number in a note
 * like this is read as advice and goes stale without anyone noticing.
 *
 * Every guide carries a `verify` sentence saying what has to be checked
 * against the current law and the facts of the particular matter. That
 * sentence is rendered on the page and is not optional.
 *
 * ---------------------------------------------------------------------
 * REVIEW STATUS
 * ---------------------------------------------------------------------
 * `reviewStatus` is "pending" or "approved".
 *
 *   pending  - the page renders the line "Drafted for general information
 *              and pending final professional review." and carries
 *              <meta name="robots" content="noindex,follow">.
 *   approved - that line goes, and the page becomes indexable.
 *
 * Approving an article is the firm saying the content has been checked. It
 * is not the same as crediting an individual, and the two are deliberately
 * separate here.
 *
 * `author` and `reviewedBy` stay {{TO_BE_ASSIGNED}} until an advocate has
 * actually written or read the article. The builder omits a withheld name
 * entirely; it never prints a placeholder and never attributes an article
 * to anyone who has not been assigned to it. A "Reviewed by" row, and the
 * reviewedBy property in the structured data, appear only when a real name
 * is set here — approving an article never invents one.
 *
 * After editing, run:  node tools/build-pages.js
 * ---------------------------------------------------------------------
 */

window.siteGuides = {
  /* The filter set on the index, in display order. Every guide's first
     category is the one shown on its card and at the top of its page. */
  categories: [
    ["property", "Property"],
    ["litigation", "Litigation"],
    ["cheque-bounce", "Cheque Bounce"],
    ["contracts", "Contracts"],
    ["income-tax", "Income Tax"],
    ["gst", "GST"],
    ["business-registration", "Business Registration"]
  ],

  /* Shown wherever an article has not yet been read by an advocate. */
  pendingReviewNote:
    "Drafted for general information and pending final professional review.",

  articles: [
    /* ==================== PROPERTY ==================== */
    {
      slug: "property-documents-to-check-before-buying-in-lucknow",
      categories: ["property"],
      title: "Property Documents to Check Before Buying in Lucknow | H.R. Legal Associate",
      h1: "Property Documents to Check Before Buying in Lucknow",
      description:
        "Which title documents, records and approvals are usually examined before an agreement to buy immovable property is signed, and why each of them matters.",
      summary:
        "Most property disputes that reach a court begin with a document nobody read. This note sets out the papers usually examined before an agreement is signed, what each one is being read for, and which of them cannot be assessed from a photograph.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "why",
          heading: "Why the documents decide the matter",
          paras: [
            "A purchase of immovable property is not a transaction in a thing so much as a transaction in a set of rights over it. Whether the seller has those rights, whether they are free of anyone else's claim, and whether they can be transferred at all are questions answered by documents rather than by inspection of the site.",
            "That is why a title examination is not a formality performed after the price is agreed. It is the work that tells you what you are agreeing to buy. A defect found before an agreement is signed is a negotiating point. The same defect found afterwards is a dispute."
          ]
        },
        {
          id: "chain",
          heading: "The chain of title",
          paras: [
            "The first thing examined is how the present owner came to own the property, and how the person before them did. Each transfer in that sequence is a separate document, and each has to be internally consistent with the ones on either side of it: the same property, the same parties, the same extent.",
            "Breaks in the chain are common and are not always fatal. A missing link may be capable of being established from other records, or it may indicate that someone outside the transaction still has a claim. Which of the two it is has to be established rather than assumed."
          ],
          list: [
            "The deed by which the present owner acquired the property, and the deeds preceding it",
            "Where the property came through succession, the documents establishing how it devolved",
            "Where it came from a development or allotment, the allotment and possession documents",
            "Any partition, release or relinquishment affecting the share being sold"
          ]
        },
        {
          id: "encumbrance",
          heading: "Encumbrances and existing claims",
          paras: [
            "A property may be owned by the seller and still be encumbered — mortgaged to a lender, subject to a charge, attached in execution of a decree, or the subject of a pending suit. Encumbrance records are searched to establish what is registered against the property, and the search has to cover a period long enough to be meaningful.",
            "A search that comes back clear is useful but not conclusive. Not everything that affects a property is registered, and an unregistered arrangement can still give rise to a claim. What the search establishes is that nothing registered stands against the title in the period searched."
          ]
        },
        {
          id: "approvals",
          heading: "Approvals, land use and permissions",
          paras: [
            "Where the property is built upon, or is to be built upon, the sanctioned plan and the approvals granted by the development or municipal authority concerned are examined against what actually exists on site. A structure that departs from the sanctioned plan is a liability that passes to whoever owns it next.",
            "Land use is a separate question from ownership. Agricultural land does not become residential because it has been sold as residential, and the permission required to change its use is a matter of record. Where a property is in a scheme or a colony, the terms on which it was allotted may themselves restrict transfer."
          ]
        },
        {
          id: "identity",
          heading: "Identity of the property and of the seller",
          paras: [
            "The property described in the deed and the property being shown have to be the same property. Boundaries, extent and identifying numbers in the revenue and municipal records are compared with the deed and with what is on the ground, because a discrepancy that is obvious on paper is often invisible on a site visit.",
            "The seller's capacity matters as much as their title. Where the seller is acting for someone else, the authority to do so is examined; where the property is held jointly, every person whose consent is required has to be a party; and where a minor or a person under disability has an interest, the transfer may need permission that cannot be given by the family alone."
          ]
        },
        {
          id: "originals",
          heading: "Why originals are examined",
          paras: [
            "A scanned copy establishes what a document says. It does not establish that the document exists, that it is the version that was registered, that it carries the endorsements it should carry, or that it has not been altered. In property work these are the questions that decide matters, and they are answered by looking at the paper.",
            "Where originals are not with the seller — because they are with a lender, or with another family member, or lost — that is itself a material fact, and the explanation for it is part of what is examined."
          ]
        }
      ],
      checklist: [
        ["Title deeds in the seller's chain", "The deed under which the seller holds, and the deeds preceding it far enough back to establish an unbroken sequence."],
        ["Encumbrance search", "A search of the registered encumbrances against the property, over a period long enough to be meaningful."],
        ["Revenue and municipal records", "Records showing the property, its extent and the name in which it stands, compared against the deed."],
        ["Mutation entries", "Entries recording earlier transfers, so that the records and the deeds tell the same story."],
        ["Sanctioned plan and approvals", "The plan and the approvals granted, compared with the structure that actually stands on the land."],
        ["Land-use position", "The use for which the land is classified, and any permission granted to change it."],
        ["Tax and charge receipts", "Receipts showing that property tax and other recurring charges have been paid up to date."],
        ["Identity and capacity of the seller", "Proof of identity, and of authority where the seller acts for another or the property is held jointly."],
        ["Possession", "Who is in physical possession, on what basis, and whether anyone else has a right to remain."]
      ],
      mistakes: [
        ["Paying an advance before the title is examined", "Money paid before the papers are read is money already committed. Examine first, then commit."],
        ["Treating a clear encumbrance search as the end of the matter", "It establishes what is registered. It does not establish that no unregistered claim exists."],
        ["Reading the deed but not the records", "A deed and the revenue record can describe different properties, or different extents of the same property. Both are read, and against each other."],
        ["Accepting scans of everything", "Some questions can only be answered from originals. A seller who will not produce them has given you information."],
        ["Assuming the whole family has agreed", "Where the property is held jointly or came through succession, every person whose consent is needed must be a party to the transfer, not merely aware of it."],
        ["Signing an agreement drafted only by the seller", "An agreement that does not deal with what happens if the title turns out to be defective leaves the buyer carrying that risk."]
      ],
      relatedServices: [
        ["Property title verification", "property-law-and-registration/property-title-verification-lucknow/index.html"],
        ["Property paper verification", "property-law-and-registration/property-paper-verification-lucknow/index.html"],
        ["Agreement to sell", "property-law-and-registration/agreement-to-sell-lawyer-lucknow/index.html"],
        ["Property law and registration", "property-law-and-registration/index.html"]
      ],
      relatedGuides: [
        "sale-deed-vs-agreement-to-sell-uttar-pradesh",
        "property-mutation-dakhil-kharij-overview",
        "gift-deed-vs-will-for-property-transfer"
      ],
      verify:
        "Which records exist for a particular property, how far back a search should go, and which approvals apply depend on where the property is, how it is classified and how it was acquired. The position for a specific property should be established on its own documents before anything is signed."
    },

    {
      slug: "sale-deed-vs-agreement-to-sell-uttar-pradesh",
      categories: ["property"],
      title: "Sale Deed vs Agreement to Sell in Uttar Pradesh | H.R. Legal Associate",
      h1: "Sale Deed and Agreement to Sell: What the Difference Means",
      description:
        "How an agreement to sell differs from a sale deed, what each document does, and why the distinction decides what a buyer actually holds.",
      summary:
        "The two documents are routinely spoken of as though they were stages of the same thing. They are not. One is a promise to transfer; the other transfers. This note explains what each does and why treating the first as though it were the second is one of the more expensive mistakes in property work.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "what-each-is",
          heading: "What each document is",
          paras: [
            "An agreement to sell records that the parties have agreed that a sale will take place, on stated terms, at a stated price, at a future point. It creates obligations between them. It does not, by itself, make the buyer the owner of the property.",
            "A sale deed is the instrument by which ownership passes. Once it is executed and registered as the law requires, the interest in the property moves from the seller to the buyer. The agreement is the promise; the deed is the performance of it."
          ]
        },
        {
          id: "why-it-matters",
          heading: "Why the distinction decides matters",
          paras: [
            "A buyer holding only an agreement to sell holds a right against the seller. A buyer holding a registered sale deed holds a right in the property. The difference is not academic: it decides what happens if the seller sells the same property to somebody else, if a creditor of the seller attaches it, or if the seller simply refuses to complete.",
            "The remedy for a broken agreement to sell is a proceeding to compel the sale or to recover what was paid, and such a proceeding takes time and is not available as of right in every case. That is a materially weaker position than owning the property, and the gap between the two is where a great deal of property litigation lives."
          ]
        },
        {
          id: "registration",
          heading: "Registration and its consequences",
          paras: [
            "The transfer of immovable property above the value the law specifies requires a registered instrument. An unregistered document purporting to transfer such property does not do so, whatever the parties intended and whatever they call it.",
            "Whether an agreement to sell itself has to be registered, and what follows if it is not, depends on the law applicable to the property and on what the document actually provides — an agreement that also delivers possession is treated differently from one that does not. This should be established for the particular document rather than assumed from another transaction."
          ]
        },
        {
          id: "what-agreement-should-do",
          heading: "What a properly drawn agreement does",
          paras: [
            "A well-drawn agreement to sell does more than fix a price. It records what has been paid and when the balance falls due; it states what the seller warrants about the title; it fixes who bears which costs; and it says what happens if either side does not perform.",
            "It also deals with the period between agreement and completion, which is where most of the risk sits. Who is in possession during it, what the seller may and may not do with the property, and what the buyer's remedy is if a defect emerges are all matters the agreement can settle in advance and expensively fails to settle afterwards."
          ],
          list: [
            "The property, described so that it cannot be confused with another",
            "The price, what has been paid, and when the balance is payable",
            "What the seller warrants about title, encumbrances and possession",
            "Who bears registration and other transaction costs",
            "What happens on default by either side",
            "When and how possession passes"
          ]
        },
        {
          id: "possession",
          heading: "Possession is not ownership",
          paras: [
            "Being handed the keys does not make a buyer the owner, and a receipt for the full price does not either. Possession without a registered transfer can create real practical difficulties: the records continue to show somebody else, and the person shown in the records is the person the world deals with.",
            "Where possession is given before completion, the basis on which it is given should be recorded. Possession held under a clear written arrangement is a different thing from possession held on an understanding, and the difference becomes visible only when there is a dispute."
          ]
        }
      ],
      checklist: [
        ["Establish which document you are being offered", "Read what it says it does, not what it is called. A document titled 'agreement' may or may not purport to transfer."],
        ["Complete the title examination before the agreement", "The agreement is where the buyer's protections are written in. That is too late if the defects are not yet known."],
        ["Record the payment schedule precisely", "What has been paid, by what means, and when the balance falls due, with the evidence of each payment retained."],
        ["State the title warranties expressly", "What the seller asserts about title and encumbrances, and what happens if the assertion proves wrong."],
        ["Deal with the interim period", "Who holds possession, what the seller may do with the property, and what each side's remedy is before completion."],
        ["Fix who bears which costs", "Registration and transaction costs are a real sum and should not be left to be argued about at the sub-registrar's office."],
        ["Plan the completion", "Who must attend, what must be produced, and what must be handed over when the deed is executed."]
      ],
      mistakes: [
        ["Treating an agreement as a completed purchase", "It is a promise to transfer. Until the transfer is made in the manner the law requires, the buyer does not own the property."],
        ["Paying the whole price on the agreement", "Payment does not transfer ownership. A payment schedule tied to completion protects the buyer; a lump sum paid early does not."],
        ["Relying on a document that was never registered", "Where the law requires registration for the transfer, an unregistered document does not achieve it, however clearly it is worded."],
        ["Leaving the agreement silent on default", "An agreement that does not say what happens if the seller refuses to complete leaves the buyer to argue for a remedy from first principles."],
        ["Taking possession without recording the basis", "Possession given on an understanding is difficult to characterise later, and it is characterised by the other side."]
      ],
      relatedServices: [
        ["Agreement to sell", "property-law-and-registration/agreement-to-sell-lawyer-lucknow/index.html"],
        ["Sale deed drafting and registration", "property-law-and-registration/sale-deed-drafting-registration-lucknow/index.html"],
        ["Property title verification", "property-law-and-registration/property-title-verification-lucknow/index.html"],
        ["Property disputes", "property-law-and-registration/property-dispute-lawyer-lucknow/index.html"]
      ],
      relatedGuides: [
        "property-documents-to-check-before-buying-in-lucknow",
        "property-mutation-dakhil-kharij-overview",
        "gift-deed-vs-will-for-property-transfer"
      ],
      verify:
        "Whether a particular document requires registration, and what follows if it was not registered, depends on the applicable law, the value involved and what the document actually provides. The position for a specific document should be confirmed before it is signed or relied upon."
    },

    {
      slug: "property-mutation-dakhil-kharij-overview",
      categories: ["property"],
      title: "Property Mutation (Dakhil Kharij): A General Overview | H.R. Legal Associate",
      h1: "Property Mutation (Dakhil Kharij): What It Is and What It Is Not",
      description:
        "What mutation of property records does, why it is applied for after a transfer, and why it is not by itself proof of ownership.",
      summary:
        "Mutation is the updating of a revenue or municipal record to show a new holder. It matters, and it is worth doing promptly. It is also widely misunderstood as conferring ownership, which it does not. This note explains what it does, what it does not, and why both halves of that sentence cause trouble.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "what-it-is",
          heading: "What mutation is",
          paras: [
            "Public authorities maintain records showing, for each property, the person in whose name it stands for their purposes — revenue records for land, municipal records for property tax. Mutation, known in Uttar Pradesh as dakhil kharij, is the process of having those records altered to show a new person after the property has changed hands.",
            "The change of hands may be a sale, a gift, a partition, or succession on a death. In each case the record is being brought into line with something that has already happened by some other means. The mutation does not bring it about."
          ]
        },
        {
          id: "not-title",
          heading: "Why it is not proof of ownership",
          paras: [
            "This is the point that causes the most difficulty. An entry in a revenue or municipal record is maintained for the authority's own purposes — principally so that it knows whom to assess and collect from. It is not an adjudication of who owns the property, and the authority making the entry is not deciding a question of title.",
            "It follows that a person shown in the records is not thereby the owner, and a person not shown is not thereby deprived of ownership. Where ownership is genuinely disputed, it is decided by a court on the deeds and the evidence, not by whose name appears in a register. A mutation entry is a piece of evidence among others; it is not the answer."
          ]
        },
        {
          id: "why-do-it",
          heading: "Why it is still worth doing, and promptly",
          paras: [
            "Everything the world does with a property is done through the person the records show. Tax demands go to that person. Utility connections and municipal correspondence are addressed to them. A subsequent buyer's advocate will read the records and ask why they do not match the deeds. A lender will do the same.",
            "Delay compounds. Where a mutation is not applied for after one transfer and the property changes hands again, or the person who should have been recorded dies, the position becomes harder to establish and the application harder to support. The work is straightforward when done promptly and is not always straightforward later."
          ]
        },
        {
          id: "how-it-proceeds",
          heading: "How an application generally proceeds",
          paras: [
            "An application is made to the authority that maintains the record, supported by the document under which the property changed hands and by proof of the applicant's identity and of the transaction. Where the change arises on a death, the documents establishing how the property devolved are what support it instead.",
            "The authority may issue notice to persons appearing from its records to be interested, so that anyone objecting may do so. Where nobody objects, the entry is generally made. Where somebody does object, the matter becomes contested, and a contested mutation is decided on the material placed before the authority — which is why the application is worth assembling properly at the outset rather than supplementing under pressure."
          ]
        },
        {
          id: "disputes",
          heading: "When mutation becomes a dispute",
          paras: [
            "Objections most often come from within a family, and most often after a death: a person who says the deceased's property did not devolve as the applicant claims, or that a document relied on is not what it appears to be. Sometimes the objector is right and sometimes not, but either way the question has moved beyond record-keeping.",
            "Where an entry has been made that should not have been, or refused where it should have been made, there are avenues to challenge the decision, and where the underlying question is really one of title, a court is where that question belongs. Which route applies, and what has to be filed, depends on the record concerned and on what is actually in dispute."
          ]
        }
      ],
      checklist: [
        ["The document under which the property changed hands", "The registered deed, or in a case of succession, the documents establishing how the property devolved."],
        ["Proof of the applicant's identity", "Documents identifying the person in whose name the record is to be altered."],
        ["The existing record entry", "A copy of the record as it currently stands, so that what is being changed is clear."],
        ["Evidence of the transaction", "Proof of payment, possession, or whatever else establishes that the transfer took place."],
        ["Tax and charge receipts", "Receipts showing that dues on the property are paid, which the authority will generally look for."],
        ["Details of other interested persons", "Anyone who may be entitled to notice, identified at the outset rather than after an objection."],
        ["Prompt filing", "Applied for as soon as the transfer is complete, while the documents and the people are all still available."]
      ],
      mistakes: [
        ["Believing mutation makes you the owner", "It records a change; it does not effect one. Ownership comes from the transfer itself, properly made."],
        ["Believing you are safe without it", "Ownership may be unaffected, but the practical consequences of records that do not match the deeds are real and cumulative."],
        ["Leaving it until the property is sold again", "The application is far harder to support once another transfer has intervened or a party has died."],
        ["Applying on incomplete papers", "An application that has to be repeatedly supplemented invites objections and takes longer than one assembled properly."],
        ["Ignoring a notice", "A notice issued in a mutation proceeding is an opportunity to be heard. Not responding is not a way of preserving your position."],
        ["Treating a family objection as a formality", "Once title is genuinely in question the matter is no longer about the register, and it should be treated accordingly."]
      ],
      relatedServices: [
        ["Mutation (dakhil kharij)", "property-law-and-registration/mutation-dakhil-kharij-lucknow/index.html"],
        ["Property title verification", "property-law-and-registration/property-title-verification-lucknow/index.html"],
        ["Property disputes", "property-law-and-registration/property-dispute-lawyer-lucknow/index.html"],
        ["Property law and registration", "property-law-and-registration/index.html"]
      ],
      relatedGuides: [
        "property-documents-to-check-before-buying-in-lucknow",
        "sale-deed-vs-agreement-to-sell-uttar-pradesh",
        "gift-deed-vs-will-for-property-transfer"
      ],
      verify:
        "Which authority maintains the relevant record, what an application must contain, and what remedy lies against a decision depend on the kind of property, where it is situated and the basis of the transfer. The position for a particular property should be confirmed before an application is made."
    },

    {
      slug: "gift-deed-vs-will-for-property-transfer",
      categories: ["property"],
      title: "Gift Deed or Will for Transferring Property | H.R. Legal Associate",
      h1: "Gift Deed and Will: Two Different Ways of Passing Property On",
      description:
        "How a gift deed differs from a will, when each is generally used, and the practical consequences of choosing one over the other.",
      summary:
        "Both are ways of passing property to someone without a sale, and they are often discussed as alternatives. They work quite differently: one takes effect now and cannot usually be undone, the other takes effect on death and can be changed until then. This note sets out what follows from that difference.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "the-difference",
          heading: "The difference that governs everything else",
          paras: [
            "A gift deed transfers property during the lifetime of the person making it. Once it is made and accepted in the manner the law requires, the property has moved. A will disposes of property on death and has no effect at all while its maker is alive.",
            "Almost every practical difference between the two follows from that. Control, revocability, the ability to change one's mind, what happens if relations sour, and who has to do what afterwards are all determined by whether the transfer has already happened or is still to come."
          ]
        },
        {
          id: "control",
          heading: "Control and the ability to change your mind",
          paras: [
            "A will can be revoked or replaced by its maker at any time while they retain capacity. Nothing is fixed until death, which is precisely why a will suits a person who wants to provide for someone without giving up anything now.",
            "A gift, once complete, is generally not revocable at the giver's will. There are limited circumstances in which a gift may be set aside, and they are narrow and fact-specific. A person considering a gift should proceed on the basis that it cannot be undone because they have changed their mind, and should take advice before assuming otherwise."
          ]
        },
        {
          id: "formalities",
          heading: "Formalities, and why they are not interchangeable",
          paras: [
            "A gift of immovable property has to be made by a registered instrument and has to be accepted by the person receiving it during the giver's lifetime. Acceptance is a real requirement, not a formality, and where it is in doubt the gift itself is in doubt.",
            "A will has its own requirements as to execution and attestation, which differ from those for a gift and are not satisfied by following the gift procedure instead. What formalities apply to a particular person's will can also depend on the law of succession applicable to them, and that should be established rather than assumed."
          ]
        },
        {
          id: "afterwards",
          heading: "What has to be done afterwards",
          paras: [
            "After a gift, the property is the recipient's, and the ordinary consequences follow: the records are updated, the property tax follows the new holder, and the recipient may deal with the property as an owner.",
            "A will produces no such immediate step. On death, whoever takes under it has to establish that they do, and what is required for that — and whether any court process is involved — depends on the applicable law of succession and on where the property is. A will is not automatically self-executing, and the assumption that it is causes a great deal of avoidable difficulty."
          ]
        },
        {
          id: "conditions",
          heading: "Conditions, retained rights and disputes",
          paras: [
            "A giver who wants to transfer property but continue to live in it, or to retain some benefit from it, is describing a more complicated arrangement than a simple gift, and one that has to be drafted deliberately. An arrangement of that kind that is agreed orally and reflected nowhere in the deed is the most common source of dispute in this area.",
            "Both gifts and wills are challenged, and on similar grounds: that the maker did not understand what they were doing, that they were pressured into it, or that the document is not genuine. What reduces that risk is contemporaneous care — that the maker's understanding is real, that the document says what they actually intend, and that the circumstances of execution are properly recorded."
          ]
        }
      ],
      checklist: [
        ["Decide when the transfer should take effect", "Now, or on death. That single question determines which instrument is being discussed."],
        ["Confirm what the giver actually wants to keep", "A right to reside, an income, or control over a later sale — each has to be drafted for, not assumed."],
        ["Establish the applicable law of succession", "It can affect what may be disposed of, and what formalities apply."],
        ["Check the property can be dealt with in this way", "Jointly held, ancestral or restricted property may not be freely transferable by one person."],
        ["Deal with acceptance where it is a gift", "Acceptance during the giver's lifetime is a requirement, and should be capable of being proved."],
        ["Attend to execution properly", "Execution and attestation done carefully, with the circumstances recorded, is what answers a later challenge."],
        ["Plan the step that follows", "Updating of records after a gift; and, after a will, what those who take under it will have to establish."]
      ],
      mistakes: [
        ["Assuming a gift can be taken back", "It generally cannot, simply because the giver has changed their mind. Advice should be taken before, not after."],
        ["Making a gift subject to an oral promise", "A promise to look after the giver, or to let them stay, that appears nowhere in the deed is very difficult to enforce."],
        ["Writing a will without regard to the applicable law", "What a person may dispose of, and how, is not the same for everyone. A will drafted on a general assumption may not do what it intends."],
        ["Assuming a will operates by itself", "Those who take under it may still have to establish their entitlement, and that is easier to plan for than to improvise."],
        ["Not thinking about capacity and pressure", "These are the grounds on which such documents are attacked. Care taken at the time is what answers them later."],
        ["Using one instrument to do the other's work", "A document that purports to give property away now but is meant to operate on death is likely to fail as both."]
      ],
      relatedServices: [
        ["Gift deed registration", "property-law-and-registration/gift-deed-registration-lucknow/index.html"],
        ["Property disputes", "property-law-and-registration/property-dispute-lawyer-lucknow/index.html"],
        ["Mutation (dakhil kharij)", "property-law-and-registration/mutation-dakhil-kharij-lucknow/index.html"],
        ["Property law and registration", "property-law-and-registration/index.html"]
      ],
      relatedGuides: [
        "property-mutation-dakhil-kharij-overview",
        "property-documents-to-check-before-buying-in-lucknow",
        "sale-deed-vs-agreement-to-sell-uttar-pradesh"
      ],
      verify:
        "The law of succession applicable to a person, what property they may dispose of, and the formalities required for a gift or a will are matters that vary with the person and the property. The position should be established on the particular facts before either document is prepared."
    },

    /* ==================== CHEQUE BOUNCE ==================== */
    {
      slug: "steps-after-a-cheque-is-dishonoured",
      categories: ["cheque-bounce", "litigation"],
      title: "Steps After a Cheque Is Dishonoured | H.R. Legal Associate",
      h1: "What to Do After a Cheque Is Dishonoured",
      description:
        "The sequence that follows a returned cheque, why each step depends on the one before it, and which documents decide whether the remedy remains available.",
      summary:
        "The remedy under the Negotiable Instruments Act is unusually unforgiving about sequence and timing. Each step has to follow the last, within the periods the statute fixes, and the whole thing is proved from documents rather than from recollection. This note explains the shape of it.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "memo",
          heading: "Start with the return memo",
          paras: [
            "When a cheque is returned unpaid the bank issues a memo stating why. That memo is the single most important document in the matter, for two reasons: it records the reason for dishonour, which determines whether the statutory remedy is available at all, and it carries a date from which the periods that follow are counted.",
            "Keep the original. Keep the returned cheque with it. A photocopy of a return memo, without the cheque, is a weak foundation for a proceeding that will be scrutinised closely."
          ]
        },
        {
          id: "two-remedies",
          heading: "There are two remedies, not one",
          paras: [
            "A dishonoured cheque can give rise to a complaint under section 138 of the Negotiable Instruments Act, 1881, which is a criminal proceeding against the drawer. It can also give rise to a civil claim for the money itself. They are separate proceedings, governed by different procedures, and pursuing one does not mean giving up the other.",
            "Which to pursue, and whether to pursue both, is a decision about what the creditor actually wants — pressure, or a decree that can be executed against assets, or both. It is worth taking that decision deliberately at the outset rather than defaulting to whichever is more familiar."
          ]
        },
        {
          id: "notice",
          heading: "The demand notice",
          paras: [
            "The statutory route requires a written demand to the drawer within the period the Act fixes, counted from intimation of the dishonour. The notice has to identify the cheque and demand payment of the cheque amount. A notice that is vague about which cheque, or that demands something other than the cheque amount, has been held defective, and the complaint that follows fails with it.",
            "How the notice is sent matters as much as what it says, because service is one of the most commonly contested issues in these matters. Send it in a way that produces evidence of despatch and delivery, keep the receipts and tracking records, and if an envelope comes back, keep it unopened."
          ]
        },
        {
          id: "waiting",
          heading: "The period allowed for payment",
          paras: [
            "After the notice, the drawer has a period fixed by the statute in which to pay. The complaint cannot be filed during that period — it is not merely inadvisable, it is premature — and if payment is made within it, the criminal remedy does not arise.",
            "The end of that period opens a further window, again fixed by statute, within which the complaint must be filed. These periods are short and they are counted from documents. This is the part of the process where matters are most often lost, and lost irrecoverably, on facts that were never in dispute."
          ]
        },
        {
          id: "complaint",
          heading: "The complaint and what supports it",
          paras: [
            "The complaint is filed before the Magistrate having jurisdiction, which depends on where the cheque was delivered for collection rather than on where the parties live or where the debt arose. Filing in the wrong court costs time that these timelines do not allow.",
            "The complaint has to be supported by the cheque, the return memo, the notice, proof of its despatch and service, and the material establishing what the cheque was given for. The Act works with presumptions that assist the holder of a cheque, but those presumptions are rebuttable, and a complaint built on a clear record of the underlying transaction is a very different proposition from one built on the cheque alone."
          ]
        },
        {
          id: "meanwhile",
          heading: "What not to do in the meantime",
          paras: [
            "Do not re-present the cheque without advice. Re-presentation affects how the periods are counted and can complicate a position that was straightforward.",
            "Do not accept part payment, or agree to a fresh arrangement, without recording what has been agreed and what happens to the existing remedy. An informal accommodation offered in good faith is frequently produced later as evidence that the debt was settled."
          ]
        }
      ],
      checklist: [
        ["The original cheque", "Retained, not deposited again, and not marked or annotated."],
        ["The bank's return memo", "The original, showing the reason for return and its date."],
        ["A record of the underlying transaction", "Invoices, ledgers, agreements or correspondence establishing what the cheque was issued for."],
        ["The demand notice", "Identifying the cheque and demanding the cheque amount, sent within the period the statute allows."],
        ["Proof of despatch and service", "Postal receipts, tracking records and any returned envelope, kept unopened."],
        ["A note of the dates", "Each date recorded from the documents as it occurs, not reconstructed afterwards."],
        ["The correct forum", "Established by reference to the bank branch where the cheque was delivered for collection."],
        ["A decision on the civil claim", "Whether the claim for the money is to be pursued alongside, taken at the outset."]
      ],
      mistakes: [
        ["Letting the notice period run out", "The window is short and is counted from intimation of dishonour. Once gone, the statutory remedy may be gone with it, even though the debt is undisputed."],
        ["Sending a vague notice", "A notice that does not clearly identify the cheque, or demands the wrong sum, can defeat the complaint that follows it."],
        ["Filing too early", "A complaint filed before the period allowed for payment has expired is premature."],
        ["Not keeping proof of service", "Service is contested more often than almost anything else in these matters, and it is proved from records kept at the time."],
        ["Re-presenting without advice", "It changes how periods are counted and can complicate the position."],
        ["Filing in the wrong court", "Jurisdiction turns on where the cheque was delivered for collection. Filing elsewhere wastes time that cannot be recovered."],
        ["Settling informally without recording it", "An accommodation not reduced to writing tends to reappear as a defence that the debt was discharged."]
      ],
      relatedServices: [
        ["Cheque bounce", "cheque-bounce-and-recovery/cheque-bounce-lawyer-lucknow/index.html"],
        ["Cheque-bounce legal notice", "cheque-bounce-and-recovery/cheque-bounce-legal-notice-lucknow/index.html"],
        ["Money recovery", "civil-litigation/money-recovery-lawyer-lucknow/index.html"],
        ["Cheque bounce and recovery", "cheque-bounce-and-recovery/index.html"]
      ],
      relatedGuides: [
        "cheque-bounce-case-vs-money-recovery-suit",
        "mou-vs-legally-binding-agreement",
        "important-clauses-in-a-partnership-deed"
      ],
      verify:
        "The periods fixed by the Act, how they are counted in a particular case, and which court has jurisdiction depend on the documents and on the current state of the law. Nothing here should be acted on without the dates being checked against the actual memo and notice in the matter."
    },

    {
      slug: "cheque-bounce-case-vs-money-recovery-suit",
      categories: ["cheque-bounce", "litigation"],
      title: "Cheque-Bounce Complaint or Money Recovery Suit | H.R. Legal Associate",
      h1: "Cheque-Bounce Complaint and Money Recovery Suit: Choosing the Route",
      description:
        "How the criminal complaint on a dishonoured cheque differs from a civil suit for the money, and what each is actually good for.",
      summary:
        "They are frequently spoken of as alternatives, as though a creditor must pick one. They are not alternatives, they do different things, and the sensible question is not which one but what each is for. This note sets out how they differ and what that means in practice.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "different-things",
          heading: "They are different proceedings doing different things",
          paras: [
            "A complaint under the Negotiable Instruments Act is a criminal proceeding. Its subject is the drawer's conduct in issuing a cheque that was not honoured, and it proceeds before a Magistrate under criminal procedure.",
            "A suit for recovery is a civil proceeding. Its subject is the debt, and what it produces if successful is a decree — an order that the sum is due, which can then be executed against the debtor's assets. The two run on different tracks and are not mutually exclusive."
          ]
        },
        {
          id: "what-each-gives",
          heading: "What each is actually good for",
          paras: [
            "The statutory complaint is generally the faster route to pressure. It puts the drawer in a criminal proceeding they must attend and answer, and it is often what produces a settlement. Provisions introduced in 2018 allow a court in appropriate cases to direct interim compensation while the complaint is pending, which strengthens that position further.",
            "The civil suit is the route to a decree that can be executed. If the object is to reach assets — a bank account, a property, a receivable — that requires a decree, and a criminal complaint does not produce one. Where the sum is substantial and the debtor has assets, the civil claim is not an afterthought."
          ]
        },
        {
          id: "proof",
          heading: "What each requires by way of proof",
          paras: [
            "The statutory route depends on a chain of documents and dates: the cheque, the return memo, a demand notice sent within the period allowed, proof of its service, and a complaint filed within the further period allowed. If that chain is broken the remedy may be unavailable however clear the debt.",
            "The civil claim depends on establishing the debt itself: what was supplied or lent, on what terms, what remains due. The cheque is evidence in that claim, but it is not the whole of it. This is why the underlying records — invoices, ledgers, correspondence — matter in both proceedings and should be assembled at the outset."
          ]
        },
        {
          id: "together",
          heading: "Running both",
          paras: [
            "Both are commonly pursued together, and there is no rule requiring a creditor to abandon one to bring the other. What has to be handled is the relationship between them: what is said in one proceeding is available in the other, and a settlement in either has to be documented so that it disposes of both.",
            "Sequencing also matters practically. The statutory route is time-critical and cannot wait; the civil claim generally has more room. Where both are intended, the usual course is to protect the time-critical remedy first and file the civil claim on a considered basis rather than in haste."
          ]
        },
        {
          id: "defence",
          heading: "If you are on the receiving end",
          paras: [
            "A drawer facing a complaint is not without answers. The presumptions the Act raises are rebuttable, and the defences that actually work are documentary: that the cheque was not issued for a legally enforceable debt, that it was given as security in circumstances that have not arisen, that the amount claimed is not what was owed, or that the statutory requirements were not complied with.",
            "What does not work is ignoring it. A complaint that goes unanswered proceeds, and the consequences of non-appearance in a criminal proceeding are of a different order from those in a civil one. Advice should be taken as soon as a notice arrives, not when a summons does."
          ]
        }
      ],
      checklist: [
        ["Decide what you actually want", "Pressure to settle, a decree to execute, or both. The answer determines the route or routes."],
        ["Protect the time-critical remedy first", "The statutory route runs on fixed periods; the civil claim generally has more room."],
        ["Assemble the underlying records", "Invoices, ledgers, agreements and correspondence support both proceedings and are needed in either."],
        ["Establish the correct forum for each", "The criminal complaint and the civil suit are not necessarily filed in the same place."],
        ["Consider the debtor's assets", "If there is nothing to execute against, a decree is worth less than the pressure of a complaint. If there is, the reverse may apply."],
        ["Document any settlement to cover both", "A settlement that disposes of one proceeding and leaves the other alive helps nobody."],
        ["Keep the proceedings consistent", "What is asserted in one is available in the other."]
      ],
      mistakes: [
        ["Treating them as alternatives", "They are separate remedies. Choosing one does not require giving up the other."],
        ["Relying on the complaint to recover money", "It is a criminal proceeding. It does not produce a decree that can be executed against assets."],
        ["Filing the civil suit and letting the statutory periods lapse", "The civil claim generally has more room; the statutory route does not, and waiting can lose it."],
        ["Building either case on the cheque alone", "The underlying transaction has to be capable of proof, in both proceedings."],
        ["Settling one proceeding informally", "A settlement that is not documented across both leaves the other running."],
        ["Ignoring a notice or a summons", "Non-appearance in a criminal proceeding has consequences of a different order. Take advice when the notice arrives."]
      ],
      relatedServices: [
        ["Section 138 defence", "cheque-bounce-and-recovery/section-138-defence-lawyer-lucknow/index.html"],
        ["Money recovery legal notice", "cheque-bounce-and-recovery/money-recovery-legal-notice-lucknow/index.html"],
        ["Money recovery suits", "civil-litigation/money-recovery-lawyer-lucknow/index.html"],
        ["Civil litigation", "civil-litigation/index.html"]
      ],
      relatedGuides: [
        "steps-after-a-cheque-is-dishonoured",
        "mou-vs-legally-binding-agreement",
        "commercial-lease-agreement-checklist"
      ],
      verify:
        "Which forum hears each proceeding, the periods that apply, and what a particular set of facts will support are matters that depend on the documents and the current state of the law. They should be confirmed for the specific matter before either proceeding is commenced."
    },

    /* ==================== CONTRACTS ==================== */
    {
      slug: "important-clauses-in-a-partnership-deed",
      categories: ["contracts", "business-registration"],
      title: "Important Clauses in a Partnership Deed | H.R. Legal Associate",
      h1: "The Clauses That Matter in a Partnership Deed",
      description:
        "What a partnership deed should settle in advance, and which omissions cause the most difficulty when partners fall out.",
      summary:
        "Most partnership deeds are written when everyone is getting along, and read for the first time when they are not. This note sets out the clauses that decide matters at that second reading, and the omissions that turn a disagreement into litigation.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "purpose",
          heading: "What the deed is for",
          paras: [
            "A partnership can exist without a written deed, and where there is none, the relations between the partners are governed by the Indian Partnership Act, 1932, and by whatever can be proved about what they agreed. That is a poor position to be in, because what the Act supplies by default is rarely what the partners would have chosen.",
            "The deed's function is to displace those defaults deliberately. Every clause worth having in it is a clause answering a question that would otherwise be answered either by the statute or by a court, on evidence, years later."
          ]
        },
        {
          id: "money",
          heading: "Capital, profits and drawings",
          paras: [
            "What each partner contributes, in what form, and whether it is capital or a loan to the firm are distinct questions with distinct consequences. A contribution of premises or equipment rather than cash should be valued and recorded as such.",
            "Profit shares are commonly stated and losses commonly forgotten; they do not have to be shared in the same proportion, but if the deed is silent about losses the position may not be what one partner assumed. Interest on capital, remuneration for partners who work in the business, and what may be drawn and when are all matters that should be settled rather than left to practice."
          ],
          list: [
            "What each partner contributes, and whether it is capital or a loan",
            "How profits are shared, and how losses are borne",
            "Whether interest is payable on capital or on loans by partners",
            "What remuneration working partners receive",
            "What may be drawn, how often, and what happens if drawings exceed entitlement"
          ]
        },
        {
          id: "management",
          heading: "Management, authority and decisions",
          paras: [
            "Who runs the business day to day, what any one partner may commit the firm to without the others, and which decisions need everybody's agreement are the clauses that matter most when partners disagree about direction. A deed that says nothing about this leaves each partner with broad authority to bind the firm, which is not usually what anyone intends.",
            "It is worth identifying the decisions that should require unanimity — borrowing, giving security, admitting a partner, disposing of a substantial asset, changing the nature of the business — and saying so, rather than discovering the point when one partner has already acted."
          ]
        },
        {
          id: "exit",
          heading: "Exit, retirement, death and expulsion",
          paras: [
            "This is where deeds most often fall silent and where silence costs the most. What happens when a partner wants to leave, dies, becomes unable to continue, or has to be removed should be dealt with while everyone is content that the answers are fair.",
            "The hardest part is valuation. A clause that says a departing partner is to be paid the value of their share, without saying how that value is arrived at, has moved the dispute rather than avoided it. Say how the firm is to be valued, who is to do it, and over what period the payment is to be made."
          ],
          list: [
            "Notice required to retire, and what happens on death or incapacity",
            "Grounds on which a partner may be expelled, and the procedure",
            "How a departing partner's share is valued, and by whom",
            "Over what period the outgoing share is paid out",
            "Whether the firm continues or is dissolved on a partner leaving",
            "What restrictions, if any, apply to a departing partner afterwards"
          ]
        },
        {
          id: "disputes",
          heading: "Disputes, dissolution and accounts",
          paras: [
            "A dispute-resolution clause is worth having, and worth drafting properly rather than copying. Where arbitration is chosen, the clause should be capable of working — the number of arbitrators, the manner of appointment and the seat all matter, and a defective clause produces a preliminary dispute about the dispute.",
            "Dissolution should also be provided for: what triggers it, how the business is wound up, who realises the assets, and in what order the proceeds are applied. And the deed should say who keeps the books, what accounting period the firm follows and what right each partner has to inspect the records, because a partner who cannot see the accounts cannot tell whether anything is wrong."
          ]
        },
        {
          id: "registration",
          heading: "Registration of the firm",
          paras: [
            "Registration of a partnership firm under the Indian Partnership Act is a separate step from executing the deed, and it carries consequences for the firm's ability to bring proceedings. The particulars registered should match the deed, and changes made later — a new partner, a change of business or of address — need the register to be updated too.",
            "Whether registration is required or advisable in a particular case, and what it entails, should be confirmed for the firm concerned rather than assumed from another firm's experience."
          ]
        }
      ],
      checklist: [
        ["Name, business and duration", "What the firm is called, what it does, and whether it is for a fixed term or at will."],
        ["Capital contributions", "What each partner brings, in what form, and whether it is capital or a loan."],
        ["Profit and loss sharing", "Both, stated separately, because they need not be in the same proportion."],
        ["Remuneration, interest and drawings", "What working partners receive, what interest is payable, and what may be drawn."],
        ["Management and authority", "Who runs the business, and which decisions require the agreement of all."],
        ["Banking and signing authority", "Who operates the accounts and on whose signature."],
        ["Books, accounts and inspection", "Who keeps them, over what period, and each partner's right to see them."],
        ["Retirement, death and expulsion", "Notice, procedure, and whether the firm continues."],
        ["Valuation of an outgoing share", "The method, the valuer and the payment period, stated expressly."],
        ["Restrictions after departure", "Any restraint on a departing partner, drawn so as to be enforceable."],
        ["Dispute resolution", "A clause that works, with the mechanism properly specified."],
        ["Dissolution and winding up", "What triggers it and how the firm is wound up."]
      ],
      mistakes: [
        ["Using a template without reading it", "A deed copied from another business usually settles that business's questions, not yours."],
        ["Stating profit shares but not loss shares", "They need not be the same, and silence may produce a result nobody intended."],
        ["Leaving valuation to be agreed later", "'At a value to be agreed' is not a valuation clause. It is a future dispute."],
        ["Saying nothing about authority", "Without limits, each partner can bind the firm, which is rarely what the partners assume."],
        ["Omitting what happens on death", "The absence of a clause here affects the deceased partner's family and the surviving partners equally, and at the worst possible time."],
        ["A defective arbitration clause", "A clause that does not specify how arbitrators are appointed produces a dispute before the dispute is reached."],
        ["Not updating the deed or the register", "A deed that no longer reflects who the partners are, or what they do, is evidence of the wrong thing."]
      ],
      relatedServices: [
        ["Partnership deed drafting", "corporate-and-contracts/partnership-deed-drafting-lucknow/index.html"],
        ["Partnership firm registration", "business-registration/partnership-firm-registration-lucknow/index.html"],
        ["Deed and registration together", "business-registration/partnership-deed-and-firm-registration-lucknow/index.html"],
        ["Corporate and contracts", "corporate-and-contracts/index.html"]
      ],
      relatedGuides: [
        "legal-and-tax-checklist-for-starting-a-firm",
        "mou-vs-legally-binding-agreement",
        "commercial-lease-agreement-checklist"
      ],
      verify:
        "What the Act supplies where a deed is silent, and what registration requires or achieves, depend on the current law and on the firm's circumstances. A deed should be settled on advice for the particular firm rather than adapted from another."
    },

    {
      slug: "mou-vs-legally-binding-agreement",
      categories: ["contracts"],
      title: "MoU or Legally Binding Agreement | H.R. Legal Associate",
      h1: "Memorandum of Understanding and Binding Agreement: What Actually Separates Them",
      description:
        "Whether a memorandum of understanding binds the parties, what determines the answer, and how to make a document do what it is meant to do.",
      summary:
        "A document is not unenforceable because it is headed 'memorandum of understanding', and it is not enforceable because it is headed 'agreement'. What decides the question is what the document says and what the parties did. This note explains what the label is worth and what actually matters.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "label",
          heading: "The heading decides very little",
          paras: [
            "Parties often sign a memorandum of understanding believing it commits them to nothing, and are surprised to find themselves in a dispute about whether it does. The heading on a document is one indication of what the parties intended, and a weak one. What a court examines is the substance: whether the parties intended to create legal relations, whether the essential terms were settled, and whether anything was given in exchange.",
            "A memorandum that identifies the parties, states what each will do, fixes a price and says when performance begins is a contract, whatever it is called. A document headed 'agreement' that leaves the essential terms to be settled later may bind nobody."
          ]
        },
        {
          id: "what-matters",
          heading: "What actually determines the answer",
          paras: [
            "Three things do most of the work. First, whether the parties intended legal consequences — a document that says in terms that it is not intended to be binding, and is consistent with that elsewhere, is treated very differently from one that is silent. Second, whether the terms are certain enough to be performed: a court cannot enforce an obligation it cannot identify. Third, whether the arrangement is supported by consideration.",
            "Conduct then affects all of it. Parties who begin performing — supplying, paying, taking possession — may find that they have made a contract by their behaviour even where the document was expressed to be preliminary. A non-binding document followed by binding conduct is a common and expensive combination."
          ]
        },
        {
          id: "partly-binding",
          heading: "Documents that bind in part",
          paras: [
            "It is entirely possible, and often sensible, for a document to be non-binding as to the commercial deal but binding as to certain matters. Confidentiality, exclusivity for a period, who bears costs if the deal does not proceed, and how disputes about the memorandum itself are resolved are all commonly made binding while the substance is not.",
            "Where that is intended, it must be said clearly: which clauses survive, which do not, and what happens if negotiations fail. A document that is vague about which parts bind is worse than one that binds entirely, because nobody can tell where they stand."
          ]
        },
        {
          id: "drafting",
          heading: "Making the document do what it is meant to do",
          paras: [
            "If the intention is not to be bound, say so expressly, say that the parties will be bound only on execution of a definitive agreement, and identify the limited provisions that are to bind in the meantime. Then behave consistently with it.",
            "If the intention is to be bound, do not use the language of intention and expectation. Write obligations: who does what, by when, for what payment, and what happens if they do not. The most common problem with commercial documents is not that they are badly drafted but that they are equivocal about whether they are meant to be documents at all."
          ]
        },
        {
          id: "practical",
          heading: "Practical consequences to think about first",
          paras: [
            "Before signing anything of this kind, it is worth asking what you would want to happen if the other side walked away tomorrow, and what you would want if you did. Those two answers usually reveal whether a binding document is wanted, and by whom.",
            "It is also worth asking what is being disclosed and what is being relied upon. Parties frequently share commercially sensitive information, or begin incurring cost, on the strength of a document they believe commits nobody. Confidentiality and cost-sharing are precisely the things that should bind even when the deal does not."
          ]
        }
      ],
      checklist: [
        ["Decide whether you want to be bound", "And whether you want the other side to be. The answers are often different."],
        ["Say so expressly", "A clear statement of binding or non-binding intention, consistent with the rest of the document."],
        ["Identify which clauses bind regardless", "Confidentiality, exclusivity, costs and dispute resolution commonly survive a failed negotiation."],
        ["Check the essential terms are certain", "Parties, subject matter, price and time. If any is left open, say expressly what happens."],
        ["Deal with confidentiality before disclosing", "Information shared cannot be unshared, whatever the document later says."],
        ["Agree who bears cost if it does not proceed", "Especially where one side is expected to spend before the definitive agreement."],
        ["Behave consistently with the document", "Conduct can create a contract that the paper says does not exist."],
        ["Fix the route to the definitive agreement", "What has to happen, by when, and what occurs if it does not."]
      ],
      mistakes: [
        ["Assuming the heading is decisive", "It is not. Substance and conduct decide the question."],
        ["Signing a 'non-binding' document and then performing", "Conduct can bind where the document says it does not."],
        ["Leaving essential terms to be agreed later", "An obligation that cannot be identified generally cannot be enforced."],
        ["Making everything non-binding", "Confidentiality and cost-sharing are usually the clauses that most need to bind."],
        ["Sharing sensitive information first and papering it afterwards", "The protection has to exist before the disclosure."],
        ["Using aspirational language for real obligations", "'The parties intend to' is not the same as 'the party shall', and the difference is the whole point."]
      ],
      relatedServices: [
        ["Contract drafting", "corporate-and-contracts/contract-drafting-lawyer-lucknow/index.html"],
        ["Vendor and service agreements", "corporate-and-contracts/vendor-service-agreement-lucknow/index.html"],
        ["Contract disputes", "civil-litigation/contract-dispute-lawyer-lucknow/index.html"],
        ["Corporate and contracts", "corporate-and-contracts/index.html"]
      ],
      relatedGuides: [
        "important-clauses-in-a-partnership-deed",
        "commercial-lease-agreement-checklist",
        "cheque-bounce-case-vs-money-recovery-suit"
      ],
      verify:
        "Whether a particular document is binding, and to what extent, depends on its terms, the surrounding circumstances and how the parties have behaved. A document should be assessed on its own facts before it is signed or relied upon."
    },

    {
      slug: "commercial-lease-agreement-checklist",
      categories: ["contracts", "property"],
      title: "Commercial Lease Agreement Checklist | H.R. Legal Associate",
      h1: "Commercial Lease Agreements: What to Settle Before Signing",
      description:
        "The terms a commercial lease should deal with, from the parties and the premises through to repair, assignment and what happens at the end.",
      summary:
        "A commercial lease commits a business to a place, a cost and a period, and the clauses that cause the most trouble are rarely the ones negotiated hardest. This note sets out what such a document should settle and where tenants and landlords most often find they have agreed to something they had not considered.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "parties",
          heading: "The parties and the premises",
          paras: [
            "The landlord under the lease should be the person entitled to grant it. Where the premises are jointly owned, held by a firm or a company, or managed by somebody on the owner's behalf, the authority to let should be established rather than inferred from who is negotiating.",
            "The premises should be described so that they cannot be confused with anything else — the extent, the floor, the identifying numbers, and what is included beyond the enclosed area. Parking, storage, terrace access, signage space and shared facilities are all things tenants assume are included and landlords frequently do not."
          ]
        },
        {
          id: "term",
          heading: "Term, renewal and ending it early",
          paras: [
            "The period of the lease, when it starts and how it ends should be plain. Where renewal is contemplated, the clause should say on what terms — a right to renew at a rent to be agreed is not a right to renew, because the parties may fail to agree.",
            "Both sides should think about early exit before signing. A tenant whose business changes and a landlord who wants the premises back are both common, and a lease that provides for neither leaves both dependent on the other's goodwill. Where a break right is agreed, the conditions attached to it matter as much as the right itself."
          ]
        },
        {
          id: "money",
          heading: "Rent, increases, deposit and outgoings",
          paras: [
            "Rent, when it is payable, and how it is to be paid are straightforward. Escalation is where documents get vague: a lease should state how and when the rent increases, on a basis that can be applied without further agreement.",
            "The security deposit needs its own attention — how much, what it secures, in what circumstances it may be applied, and when and how it is returned. Deposits are the single most commonly disputed item at the end of a commercial tenancy. Outgoings should also be allocated expressly: municipal taxes, maintenance charges, common-area costs, utilities and any charges levied by the building's association."
          ],
          list: [
            "Rent, the date it falls due, and the manner of payment",
            "How and when rent increases, on a basis that can be applied without negotiation",
            "The deposit, what it secures, and the terms of its return",
            "Which outgoings are the landlord's and which the tenant's",
            "What happens on late payment"
          ]
        },
        {
          id: "use",
          heading: "Permitted use, fit-out and alterations",
          paras: [
            "The lease should state what the premises may be used for, and the tenant should check that the stated use is one the premises are actually permitted to be used for. A commercial use in premises not approved for it is a problem the tenant will encounter, whatever the lease says.",
            "Fit-out and alterations should be dealt with in advance: what the tenant may do, whose consent is needed, who owns the improvements afterwards, and whether the premises must be reinstated at the end. Reinstatement obligations are routinely overlooked and can be a substantial cost at exit."
          ]
        },
        {
          id: "repair",
          heading: "Repair, insurance and interruption",
          paras: [
            "Who repairs what should be allocated clearly, distinguishing structure from interior and from installations such as lifts, generators and air-conditioning. A clause obliging a tenant to keep the premises in good repair may extend further than the tenant expects, and a schedule of condition taken at the start is the tenant's protection against being asked to hand back something better than they received.",
            "Insurance should be allocated too — who insures the building, who insures the tenant's contents and works, and who bears the risk if the premises are damaged. And the lease should say what happens if the premises become unusable: whether rent abates, and whether either party may terminate."
          ]
        },
        {
          id: "transfer",
          heading: "Assignment, sub-letting and the end of the term",
          paras: [
            "Whether the tenant may transfer the lease or sub-let, and on what conditions, matters to a business that may be sold or restructured. An absolute prohibition may be acceptable to a tenant on a short term and unacceptable on a long one.",
            "The end of the term should be planned in the document: what condition the premises must be returned in, what must be removed, how the deposit is dealt with, and what happens if the tenant stays on. Holding over without an agreed basis creates uncertainty for both sides, and the lease is the place to resolve it."
          ]
        }
      ],
      checklist: [
        ["Authority to grant the lease", "That the landlord is entitled to let, and that anyone signing has authority to do so."],
        ["A precise description of the premises", "Extent, location and everything included beyond the enclosed area."],
        ["Term, commencement and renewal", "Including renewal terms capable of being applied without fresh agreement."],
        ["Break rights", "Whether either side may end the lease early, and on what conditions."],
        ["Rent and escalation", "Stated on a basis that can be applied without further negotiation."],
        ["Deposit terms", "Amount, what it secures, and precisely when and how it is returned."],
        ["Allocation of outgoings", "Taxes, maintenance, common-area charges and utilities, each assigned to one party."],
        ["Permitted use", "Stated, and checked against what the premises are actually permitted to be used for."],
        ["Fit-out, alterations and reinstatement", "What may be done, whose consent is needed, and what must be undone at the end."],
        ["Repair obligations", "Structure, interior and installations, allocated separately."],
        ["Schedule of condition", "A record, with photographs, of the state of the premises at handover."],
        ["Insurance and damage", "Who insures what, and what happens if the premises become unusable."],
        ["Assignment and sub-letting", "Whether permitted, and on what conditions."],
        ["Exit obligations", "Condition on return, removal of works, deposit, and the position if the tenant stays on."],
        ["Registration and stamping", "Confirmed for the document and the term, since requirements vary."]
      ],
      mistakes: [
        ["Negotiating rent and ignoring everything else", "The clauses that cost money later are usually repair, reinstatement and the deposit."],
        ["Not recording the condition at handover", "Without a schedule of condition, a tenant may be asked to return the premises in better condition than they received them."],
        ["Accepting a renewal 'at a rent to be agreed'", "That is not a right to renew; it is a right to negotiate."],
        ["Overlooking reinstatement", "An obligation to restore the premises can be a significant cost that appears only at exit."],
        ["Assuming the permitted use is permitted", "What the lease allows and what the premises are approved for are separate questions."],
        ["Leaving outgoings unallocated", "Maintenance and common-area charges are real sums and should not be left to be argued about."],
        ["Not checking who is signing", "A lease granted by someone without authority to grant it is a problem for the tenant, not the signatory."],
        ["Assuming the document need not be registered", "Requirements depend on the term and the document, and should be confirmed rather than assumed."]
      ],
      relatedServices: [
        ["Lease and rent agreements", "property-law-and-registration/lease-rent-agreement-lucknow/index.html"],
        ["Contract drafting", "corporate-and-contracts/contract-drafting-lawyer-lucknow/index.html"],
        ["Property disputes", "property-law-and-registration/property-dispute-lawyer-lucknow/index.html"],
        ["Business retainer", "corporate-and-contracts/business-legal-retainer-lucknow/index.html"]
      ],
      relatedGuides: [
        "mou-vs-legally-binding-agreement",
        "important-clauses-in-a-partnership-deed",
        "property-documents-to-check-before-buying-in-lucknow"
      ],
      verify:
        "Whether a lease of a particular term requires registration, how it must be stamped, and what statutory protections apply to the premises depend on the applicable law and on where the property is. These should be confirmed for the specific document before it is executed."
    },

    /* ==================== GST ==================== */
    {
      slug: "how-to-respond-to-a-gst-notice",
      categories: ["gst"],
      title: "How to Respond to a GST Notice | H.R. Legal Associate",
      h1: "Responding to a GST Notice: A General Approach",
      description:
        "How to read a notice under the goods and services tax law, what to establish before replying, and why the first reply usually sets the shape of everything that follows.",
      summary:
        "Notices under the goods and services tax law range from a routine request for information to the commencement of a proceeding with real consequences. Reading which one you have received is the first task, and it determines everything after it. This note sets out a general approach; it is not a substitute for advice on the notice itself.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "read-it",
          heading: "Read what the notice actually is",
          paras: [
            "Notices are not all the same. Some seek an explanation of a discrepancy between returns. Some intimate a proposed liability and invite a response before any determination is made. Some initiate a proceeding to determine tax, interest and penalty. Some concern registration rather than liability at all.",
            "The notice itself states the provision it is issued under, the period it concerns, what is being asked, and the manner and time within which a reply is to be made. Those four things should be extracted and written down before anything else is done, because they determine what kind of response is required and how much room there is to prepare it."
          ]
        },
        {
          id: "time",
          heading: "Deal with time first",
          paras: [
            "Every such notice specifies a period for response, and the period is stated in the notice itself. Establish it immediately and work backwards from it, because assembling records takes longer than people expect and the reply is only as good as the material behind it.",
            "Where the time available is genuinely insufficient, an extension may be sought — but that is a request to be made properly and in good time, not a reason to let the period pass. A reply filed late, or not at all, may result in the matter being decided on the material the authority already has, which is by definition the material that prompted the notice."
          ]
        },
        {
          id: "reconcile",
          heading: "Establish the facts before framing the reply",
          paras: [
            "Most notices arise from a discrepancy — between returns, between returns and the records of suppliers or recipients, or between what was declared and what an authority has been told by somebody else. The reply has to be built on a reconciliation, not on an assertion.",
            "That means going back to the underlying documents: invoices, credit and debit notes, contracts, transport and delivery records, payment records and the books. Where the discrepancy is real, it is better to identify it yourself and address it than to deny it and have it established. Where it is not real, the reconciliation is what demonstrates that."
          ]
        },
        {
          id: "reply",
          heading: "Framing the reply",
          paras: [
            "A reply should answer what was asked, in the order it was asked, and should annex the material it relies on. A reply that argues generally without producing documents invites a further notice; a reply that produces documents without explaining what they show invites the authority to draw its own conclusions.",
            "Where a proposed liability is disputed, the reply should state the grounds clearly, because the grounds taken at this stage shape what can be argued later. Where part of a liability is accepted, saying so plainly and dealing with the rest is usually more effective than a blanket denial that the record does not support."
          ]
        },
        {
          id: "after",
          heading: "What follows, and who does what",
          paras: [
            "A reply may resolve the matter, or lead to a personal hearing, or be followed by an order. If an order is made, there are avenues of appeal against it, and those avenues run on their own timelines. Where an adverse order is a real possibility, it is worth understanding the appellate route before the order arrives rather than after.",
            "It is also worth being clear about who does what. This is a firm of advocates. Advice on the legal position, drafting the reply and representation before the authority are work an advocate does. Preparation of returns and reconciliations is carried out with, or coordinated with, a chartered accountant, and audit and any certificate that only a chartered accountant may sign is their work, not ours."
          ]
        }
      ],
      checklist: [
        ["Identify the provision and the period", "Both are stated in the notice, and both determine what kind of response is required."],
        ["Note the time allowed for reply", "Taken from the notice itself, and worked backwards from immediately."],
        ["Retrieve the returns for the period", "As filed, so that what was actually declared is established rather than remembered."],
        ["Assemble the underlying records", "Invoices, credit and debit notes, contracts, transport records, payment records and the books."],
        ["Prepare a reconciliation", "Showing how the figures in the returns relate to the records, and where any difference arises."],
        ["Identify what is accepted and what is disputed", "Separating the two makes for a stronger reply than a blanket denial."],
        ["Draft the reply to answer the notice", "Point by point, in the order asked, with the supporting material annexed."],
        ["Keep proof of filing", "Whatever acknowledgement the manner of filing produces, retained."],
        ["Understand the route if an order follows", "The appellate avenue and its own timeline, established before it is needed."]
      ],
      mistakes: [
        ["Letting the period pass", "The matter may then be decided on the material that prompted the notice."],
        ["Replying without reconciling", "An assertion unsupported by records rarely closes a discrepancy."],
        ["Denying everything", "A blanket denial that the record does not support weakens the parts of the reply that are sound."],
        ["Producing documents without explaining them", "Unexplained annexures leave the authority to draw its own conclusions."],
        ["Treating the reply as informal", "The grounds taken now shape what can be argued later, including on appeal."],
        ["Ignoring a hearing", "A personal hearing is an opportunity, and not attending is not a way of preserving a position."],
        ["Assuming one professional can do everything", "Some of this work is an advocate's; some requires a chartered accountant. Knowing which is which avoids delay."]
      ],
      relatedServices: [
        ["GST notice reply", "tax-and-gst/gst-notice-reply-lawyer-lucknow/index.html"],
        ["GST", "tax-and-gst/gst-consultant-lucknow/index.html"],
        ["GST returns", "tax-and-gst/gst-return-filing-lucknow/index.html"],
        ["Tax and GST", "tax-and-gst/index.html"]
      ],
      relatedGuides: [
        "income-tax-notice-general-response-guide",
        "legal-and-tax-checklist-for-starting-a-firm",
        "commercial-lease-agreement-checklist"
      ],
      verify:
        "What a particular notice requires, the time it allows and the consequences of an adverse order depend on the provision under which it is issued, the period concerned and the current state of the law and the notifications in force. Nothing here should be acted on without the notice itself being read and advice taken on it."
    },

    /* ==================== INCOME TAX ==================== */
    {
      slug: "income-tax-notice-general-response-guide",
      categories: ["income-tax"],
      title: "Responding to an Income-Tax Notice | H.R. Legal Associate",
      h1: "Income-Tax Notices: A General Guide to Responding",
      description:
        "How to read an income-tax notice, what to establish before replying, and how the reply affects the proceedings that may follow.",
      summary:
        "An income-tax notice is not one thing. It may seek an explanation, propose an adjustment, commence an assessment, or concern a year long closed. What it is determines what has to be done, and the answer is in the notice. This note explains the general approach and what a reply should be built on.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "identify",
          heading: "Establish what has been received",
          paras: [
            "The first task is identification. A notice states the provision of the Income-tax Act under which it is issued, the assessment year it concerns, what is required, and the period within which it must be complied with. Those four facts determine the nature of the proceeding and how serious it is.",
            "A communication proposing an adjustment arising from the return as processed is a different matter from one commencing an assessment, and both are different from one concerning income said to have escaped assessment in an earlier year. Responding to the wrong kind of notice is a common and avoidable error."
          ]
        },
        {
          id: "verify",
          heading: "Verify that it is genuine and correctly addressed",
          paras: [
            "Notices should be checked against the record available to the taxpayer through the official channel, and the identifying particulars on the notice — the name, the permanent account number, the assessment year and any document identification number it carries — checked against your own.",
            "Communications purporting to be tax notices are a known vector for fraud. A notice that arrives by an unexpected route, that asks for payment to an account, or that demands immediate action outside the official channel should be verified before anything is done in response to it."
          ]
        },
        {
          id: "records",
          heading: "Go back to the return and the records",
          paras: [
            "Retrieve the return actually filed for the year, and the computation behind it. A great many notices arise from a difference between what the return declares and what the department has been told from another source — by a bank, an employer, a purchaser, or a reporting entity.",
            "The reply is then built on reconciliation: what the third-party information shows, what the return shows, and why they differ. Where the difference has an innocent explanation, the explanation has to be documented rather than asserted. Where the return was wrong, that is a different conversation, and it is better had deliberately than discovered."
          ]
        },
        {
          id: "reply",
          heading: "Framing the response",
          paras: [
            "A response should deal with each item raised, in the order raised, and should annex the documents relied on. Where a figure is explained by a document, produce the document. Where a position is a matter of legal characterisation rather than of fact, state the basis on which the position was taken.",
            "The manner of response is specified in the notice, and it should be followed, with whatever acknowledgement the process generates retained. Where the time allowed is genuinely insufficient, an extension should be sought properly and in advance rather than assumed."
          ]
        },
        {
          id: "consequences",
          heading: "What follows, and the appellate route",
          paras: [
            "A response may end the matter, or lead to further queries, a hearing, or an order making an addition or a demand. Where an order is adverse, there are appellate remedies, and they run on their own timelines from the date of the order.",
            "It is worth understanding that route before it is needed. It is also worth understanding what the grounds taken at the assessment stage do to the appeal: an explanation offered for the first time on appeal is in a weaker position than one advanced, with documents, when the question was first raised."
          ]
        },
        {
          id: "who",
          heading: "Who does what",
          paras: [
            "This is a firm of advocates. Advice on the legal position, the drafting of replies and appeals, and representation before the authority or appellate forum, where an advocate may act as authorised representative, is our work.",
            "Preparation of returns and computations is carried out with, or coordinated with, a chartered accountant. Audit, and any certificate that only a chartered accountant may sign, is their work. Nothing here is an offer to audit accounts or to issue any such certificate, and no undertaking is given that any particular person will appear in a given matter."
          ]
        }
      ],
      checklist: [
        ["The notice itself", "The provision, the assessment year, what is required and the time allowed, all extracted and noted."],
        ["Verification through the official channel", "That the notice appears on the record available to you, and that its particulars match yours."],
        ["The return as filed", "Retrieved for the year concerned, with the computation behind it."],
        ["The third-party information", "What the department has been told from other sources for that year."],
        ["A reconciliation", "Showing how the return and the other information relate, and where any difference arises."],
        ["Supporting documents", "Bank statements, contracts, invoices, proofs of payment and anything else the explanation rests on."],
        ["A point-by-point response", "Answering what was asked, in order, with the material annexed."],
        ["Proof of filing", "Whatever acknowledgement the prescribed manner of response produces."],
        ["The appellate position", "The remedy available if an adverse order follows, and its timeline, established in advance."]
      ],
      mistakes: [
        ["Ignoring it because the year is old", "Notices concerning earlier years are issued, and ignoring one does not close it."],
        ["Assuming it is genuine without checking", "Fraudulent communications imitating tax notices exist. Verify through the official channel."],
        ["Replying without retrieving the return", "The reply has to be consistent with what was actually filed, not with what is recalled."],
        ["Asserting an explanation without documents", "An explanation that cannot be supported is generally not accepted."],
        ["Missing the time allowed", "It is stated in the notice, and an extension is something to request properly, not to assume."],
        ["Holding back an explanation for the appeal", "An explanation first offered on appeal is in a weaker position than one advanced when the question arose."],
        ["Sending money in response to a communication", "Payment demanded outside the official channel is a warning sign, not an instruction."]
      ],
      relatedServices: [
        ["Income-tax notices", "tax-and-gst/income-tax-notice-lawyer-lucknow/index.html"],
        ["Assessment and appeal", "tax-and-gst/income-tax-assessment-appeal-lucknow/index.html"],
        ["Income tax", "tax-and-gst/income-tax-consultant-lucknow/index.html"],
        ["Tax and GST", "tax-and-gst/index.html"]
      ],
      relatedGuides: [
        "how-to-respond-to-a-gst-notice",
        "legal-and-tax-checklist-for-starting-a-firm",
        "important-clauses-in-a-partnership-deed"
      ],
      verify:
        "What a particular notice requires, the time it allows, and the appellate remedy against any order depend on the provision under which it is issued, the assessment year and the current state of the law. The notice itself should be read and advice taken on it before anything is filed."
    },

    /* ==================== BUSINESS REGISTRATION ==================== */
    {
      slug: "legal-and-tax-checklist-for-starting-a-firm",
      categories: ["business-registration", "contracts"],
      title: "Legal and Tax Checklist for Starting a Firm | H.R. Legal Associate",
      h1: "Starting a Business: The Legal and Tax Questions to Settle First",
      description:
        "What to decide before a business begins trading — the structure, the founding documents, the registrations to consider, and the records to keep from the first day.",
      summary:
        "Most of what goes wrong in a young business was decided, or left undecided, in its first few weeks. This note sets out the questions worth settling before trading starts: what structure to use, what the founders should have in writing, which registrations arise, and what records to keep from the beginning.",
      datePublished: "2026-08-07",
      dateReviewed: "2026-08-07",
      reviewStatus: "approved",
      author: "{{TO_BE_ASSIGNED}}",
      reviewedBy: "{{TO_BE_ASSIGNED}}",
      sections: [
        {
          id: "structure",
          heading: "Choosing the structure",
          paras: [
            "The first decision is what the business is going to be: a proprietorship, a partnership firm, a limited liability partnership, or a company. They differ in how liability is borne, how they are taxed, what compliance they carry, how easily ownership can be transferred and how they are perceived by customers and lenders.",
            "There is no structure that is right in general. A single person testing an idea and a venture with several founders and outside investment are answering different questions. What matters is that the choice is made deliberately, with the consequences understood, because changing structure later is possible but is more work than choosing well at the start."
          ],
          list: [
            "How liability for the business's obligations is borne",
            "How the business and its owners are taxed",
            "What ongoing filings and compliance the structure carries",
            "How ownership can be transferred, and whether outside investment is contemplated",
            "How the structure is regarded by customers, suppliers and lenders"
          ]
        },
        {
          id: "founders",
          heading: "What the founders should have in writing",
          paras: [
            "Where more than one person is involved, the arrangement between them should be recorded before the business begins, not after it succeeds or fails. Who contributes what, who does what, how profits are shared, who decides what, and what happens when somebody wants to leave are the questions that later become disputes.",
            "The document depends on the structure — a partnership deed, an LLP agreement, or the constitutional documents and a shareholders' arrangement for a company — but the questions it has to answer are much the same. The most commonly omitted and most consequential of them is what happens on a founder's departure and how their stake is valued."
          ]
        },
        {
          id: "registrations",
          heading: "Registrations and approvals to consider",
          paras: [
            "Which registrations a business requires depends on its structure, what it does, where it operates and its scale. Some follow from the structure itself. Some follow from the activity — a trade or establishment licence, a food, drug or pollution approval, or a licence particular to the sector. Some follow from turnover or from the nature of the supplies made.",
            "Registration under the goods and services tax law arises in defined circumstances, and whether a particular business is required to register — or would benefit from registering voluntarily — should be established for that business rather than assumed. The same is true of registrations relating to employees, which arise once a business reaches the point at which the relevant law applies to it."
          ]
        },
        {
          id: "contracts",
          heading: "The documents the business will actually use",
          paras: [
            "A business generates the same documents repeatedly: terms on which it supplies, terms on which it buys, engagement letters or employment documents for the people who work in it, and whatever the premises arrangement requires. Preparing these once, properly, at the start is far cheaper than dealing with the consequences of not having them.",
            "The single most valuable clause in a young business's supply terms is the one dealing with payment: when it falls due, what happens if it does not arrive, and what the business may do about it. A great deal of recovery litigation exists because that clause was never written."
          ]
        },
        {
          id: "records",
          heading: "Records, from the first day",
          paras: [
            "Books of account, invoices raised and received, bank records, and the correspondence in which arrangements were made are what every later question is answered from — a tax notice, a dispute with a customer, a claim by a departing founder, or a purchaser's due diligence.",
            "Keeping business money separate from personal money from the first day is the discipline that makes all of this possible. Where the two are mixed, reconstructing the position afterwards is expensive and sometimes cannot be done convincingly at all."
          ]
        },
        {
          id: "who",
          heading: "Who does what",
          paras: [
            "This is a firm of advocates. Advice on structure and its legal consequences, the drafting of founding documents and commercial contracts, and assistance with registration applications and with replies to authorities is our work.",
            "Preparation of returns is carried out with, or coordinated with, a chartered accountant, and audit and any certificate that only a chartered accountant or company secretary may sign is their work. No professional designation is claimed for anyone at the firm beyond enrolment as an advocate."
          ]
        }
      ],
      checklist: [
        ["Decide the structure deliberately", "Weighing liability, taxation, compliance, transferability and how the business will be perceived."],
        ["Record the arrangement between the founders", "Contributions, roles, profit sharing, decision-making, and departure."],
        ["Settle how a founder's stake is valued on exit", "The method and the valuer, stated expressly rather than left to be agreed."],
        ["Establish which registrations apply", "Those following from the structure, from the activity, and from scale."],
        ["Check the position on tax registrations", "Including whether registration under the goods and services tax law is required or advisable."],
        ["Check what the premises require", "The lease or licence for the place of business, and any approval tied to it."],
        ["Prepare standard supply and purchase terms", "Especially the payment clause and what follows on non-payment."],
        ["Prepare documents for the people you engage", "Employment or engagement documents, with confidentiality and ownership of work dealt with."],
        ["Open a separate bank account", "Business money kept apart from personal money from the first transaction."],
        ["Set up books and document retention", "Invoices, bank records, contracts and correspondence, kept from the beginning."],
        ["Note the recurring filings", "What has to be filed, and when, for the structure chosen."]
      ],
      mistakes: [
        ["Starting to trade before deciding the structure", "Unwinding arrangements entered into by the wrong entity is avoidable work."],
        ["Founders relying on an understanding", "Every founder dispute begins with people who were sure they had agreed."],
        ["Leaving exit and valuation out", "It is the omission that most reliably produces litigation."],
        ["Assuming registrations from another business apply", "They depend on structure, activity, place and scale, and should be established for this business."],
        ["Trading without written terms", "The payment clause you did not write is the recovery suit you will file."],
        ["Mixing business and personal money", "It makes the position expensive to reconstruct and difficult to demonstrate."],
        ["Treating record-keeping as an accounting chore", "The records are what answer a tax notice, a customer dispute and a purchaser's due diligence."],
        ["Assuming one professional covers everything", "Some of this work is an advocate's and some a chartered accountant's or company secretary's."]
      ],
      relatedServices: [
        ["Partnership firm registration", "business-registration/partnership-firm-registration-lucknow/index.html"],
        ["Company registration", "business-registration/private-limited-company-registration-lucknow/index.html"],
        ["LLP registration", "business-registration/llp-registration-lucknow/index.html"],
        ["Business registration", "business-registration/index.html"]
      ],
      relatedGuides: [
        "important-clauses-in-a-partnership-deed",
        "mou-vs-legally-binding-agreement",
        "how-to-respond-to-a-gst-notice"
      ],
      verify:
        "Which registrations a business requires, the thresholds at which they arise and what each involves depend on the structure, the activity, the place of business and the current state of the law and the notifications in force. The position for a particular business should be established before it begins trading."
    }
  ]
};
